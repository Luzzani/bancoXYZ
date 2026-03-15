import axios from 'axios';
import { apiClient } from './apiClient';
import { AuthError } from '../features/auth/types';

export interface BalanceResponse {
  balance: number;
  currency: string;
  lastMovement: string;
}

export const balanceApi = {
  getBalance: async (): Promise<BalanceResponse> => {
    try {
      const response = await apiClient.get<BalanceResponse>('/balance');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as AuthError;

        throw {
          message: serverError?.message || 'No se pudo obtener el saldo',
          status: error.response?.status || 500,
          code: serverError?.code || 'BALANCE_ERROR',
        } as AuthError;
      }

      throw {
        message: 'Ocurrió un error inesperado al consultar el saldo',
        status: 500,
      } as AuthError;
    }
  },
};
