import { delay } from '../../utils/time';
import { mockInstance } from './setup';
import { AuthResponse, LoginCredentials } from '../../features/auth/types';
import {
  BalanceResponse,
  TransferRequest,
  TransferResponse,
  ApiError,
  TransferHistoryItem,
} from '../types';

// VARIABLES DE ESTADO LOCAL (SIMULA LA DB)
// Las declaramos fuera de la función para que persista durante la sesión de la app
let currentBalance = 1500420.5;
let transferHistory: TransferHistoryItem[] = [
  {
    value: 5000,
    date: '2026-03-10',
    currency: 'ARS',
    payeer: { document: '2033444555', name: 'Marta Gómez' },
  },
];
const AUTH_TOKEN = 'v3ry-s3cur3-f4k3-t0k3n';

const createError = (status: number, message: string, code: string): [number, ApiError] => [
  status,
  { message, code, status },
];

const UNAUTHORIZED_ERROR = createError(
  401,
  'No autorizado: Token inválido o inexistente',
  'AUTH_UNAUTHORIZED',
);

export const setupHandlers = () => {
  mockInstance
    .onPost('/login')
    .reply(async (config): Promise<[number, AuthResponse | ApiError]> => {
      await delay(1500);
      const { email, password }: LoginCredentials = JSON.parse(config.data);

      if (email === 'admin@test.com' && password === '123456') {
        return [
          200,
          {
            token: AUTH_TOKEN,
            user: { id: 1, name: 'John Doe', email: 'admin@test.com' },
          },
        ];
      }

      return createError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
    });

  mockInstance
    .onGet('/balance')
    .reply(async (config): Promise<[number, BalanceResponse | ApiError]> => {
      await delay(1000);
      const authHeader = config.headers?.Authorization;

      if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
        return UNAUTHORIZED_ERROR;
      }

      return [
        200,
        {
          balance: currentBalance,
          currency: 'ARS',
          lastMovement: '2026-03-14',
        },
      ];
    });

  mockInstance
    .onPost('/transfer')
    .reply(async (config): Promise<[number, TransferResponse | ApiError]> => {
      await delay(1500);
      const authHeader = config.headers?.Authorization;

      if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
        return UNAUTHORIZED_ERROR;
      }

      const data: TransferRequest = JSON.parse(config.data);
      const { value, currency, payeerDocument, transferDate } = data;

      if (!value || !currency || !payeerDocument || !transferDate) {
        return createError(400, 'Datos inválidos: faltan campos obligatorios.', 'MISSING_FIELDS');
      }

      if (value <= 0) {
        return createError(400, 'El monto debe ser mayor a cero.', 'INVALID_AMOUNT');
      }

      if (value > currentBalance) {
        return createError(
          400,
          'Saldo insuficiente para realizar la operación.',
          'INSUFFICIENT_FUNDS',
        );
      }

      currentBalance -= value;

      const newTransfer = {
        value,
        date: transferDate,
        currency,
        payeer: { document: payeerDocument, name: 'Destinatario Mock' },
      };
      transferHistory.unshift(newTransfer);

      return [200, { status: 'success' }];
    });
  mockInstance
    .onGet('/transferlist')
    .reply(async (config): Promise<[number, TransferHistoryItem[] | ApiError]> => {
      await delay(1000);
      const authHeader = config.headers?.Authorization;

      if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
        return UNAUTHORIZED_ERROR;
      }

      return [200, transferHistory];
    });
};
