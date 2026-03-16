import axios from 'axios';
import { apiClient } from './apiClient';
import { ApiError, BalanceDTO, BalanceResponse } from './types';

export const balanceApi = {
  getBalance: async (): Promise<BalanceResponse> => {
    try {
      const response = await apiClient.get<BalanceDTO>('/balance');

      const data = response.data;

      return {
        balance: data.accountBalance,
        currency: data.currency,
        lastMovement: data.lastMovement,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiError;

        throw {
          message: serverError?.message || 'No se pudo obtener el saldo',
          status: error.response?.status || 500,
          code: serverError?.code || 'BALANCE_ERROR',
        } as ApiError;
      }

      throw {
        message: 'Ocurrió un error inesperado al consultar el saldo',
        status: 500,
      } as ApiError;
    }
  },
};
