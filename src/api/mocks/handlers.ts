import { AxiosRequestConfig } from 'axios';
import { delay } from '../../utils/time';
import { mockInstance } from './setup';
import { AuthResponse, LoginCredentials } from '../../features/auth/types';
import { BalanceResponse, TransferRequest, TransferResponse } from '../types';

// VARIABLE DE ESTADO LOCAL (SIMULA LA DB)
// La declaramos fuera de la función para que persista durante la sesión de la app
let currentBalance = 1500420.5;

export const setupHandlers = () => {
  mockInstance
    .onPost('/login')
    .reply(
      async (config: AxiosRequestConfig): Promise<[number, AuthResponse | { message: string }]> => {
        await delay(1500);
        const { email, password }: LoginCredentials = JSON.parse(config.data);

        if (email === 'admin@test.com' && password === '123456') {
          return [
            200,
            {
              token: 'v3ry-s3cur3-f4k3-t0k3n',
              user: {
                id: 1,
                name: 'John Doe',
                email: 'admin@test.com',
              },
            },
          ];
        }

        return [401, { message: 'Credenciales inválidas' }];
      },
    );
  mockInstance
    .onGet('/balance')
    .reply(
      async (
        config: AxiosRequestConfig,
      ): Promise<[number, BalanceResponse | { message: string }]> => {
        await delay(1000);

        const authHeader = config.headers?.Authorization;

        if (authHeader === 'Bearer v3ry-s3cur3-f4k3-t0k3n') {
          return [
            200,
            {
              balance: currentBalance,
              currency: 'ARS',
              lastMovement: '2026-03-14',
            },
          ];
        }

        return [401, { message: 'No autorizado: Token inválido o inexistente' }];
      },
    );
  mockInstance.onPost('/transfer').reply(async (config): Promise<[number, TransferResponse]> => {
    await delay(1500);

    const authHeader = config.headers?.Authorization;
    if (authHeader !== 'Bearer v3ry-s3cur3-f4k3-t0k3n') {
      return [
        401,
        {
          status: 'error',
          message: 'No autorizado: Token inválido o inexistente',
        },
      ];
    }

    const data: TransferRequest = JSON.parse(config.data);
    const { value, currency, payeerDocument, transferDate } = data;

    if (!value || !currency || !payeerDocument || !transferDate) {
      return [
        400,
        {
          status: 'error',
          message: 'Datos inválidos: faltan campos obligatorios en la transferencia.',
        },
      ];
    }

    if (value <= 0) {
      return [
        400,
        {
          status: 'error',
          message: 'El monto de la transferencia debe ser mayor a cero.',
        },
      ];
    }

    if (value > currentBalance) {
      return [
        400,
        {
          status: 'error',
          message: 'Saldo insuficiente para realizar la operación.',
        },
      ];
    }

    currentBalance -= value;

    return [
      200,
      {
        status: 'success',
      },
    ];
  });
};
