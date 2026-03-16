import axios from 'axios';
import { apiClient } from './apiClient';
import { ApiError, TransferHistoryItem } from './types';

export const transferListApi = {
  getHistory: async (): Promise<TransferHistoryItem[]> => {
    try {
      const response = await apiClient.get<TransferHistoryItem[]>('/transferlist');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiError;

        throw {
          message: serverError?.message || 'No se pudo cargar el historial de transacciones',
          status: error.response?.status || 500,
          code: serverError?.code || 'FETCH_HISTORY_ERROR',
        } as ApiError;
      }

      throw {
        message: 'Ocurrió un error inesperado al consultar el historial',
        status: 500,
      } as ApiError;
    }
  },
};
