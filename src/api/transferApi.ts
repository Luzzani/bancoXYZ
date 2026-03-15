import axios from 'axios';
import { apiClient } from './apiClient';
import { ApiError, TransferRequest, TransferResponse } from './types';

export const transferApi = {
  sendTransfer: async (transferData: TransferRequest): Promise<TransferResponse> => {
    try {
      const response = await apiClient.post<TransferResponse>('/transfer', transferData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiError;

        throw {
          message: serverError?.message || 'No se pudo realizar la transferencia',
          status: error.response?.status || 500,
          code: serverError?.code || 'TRANSFER_ERROR',
        } as ApiError;
      }

      throw {
        message: 'Ocurrió un error inesperado al procesar la transferencia',
        status: 500,
      } as ApiError;
    }
  },
};
