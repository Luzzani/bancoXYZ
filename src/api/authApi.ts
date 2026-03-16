import axios from 'axios';
import { AuthResponse, LoginCredentials } from '../features/auth/types';
import { apiClient } from './apiClient';
import { ApiError } from './types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/login', credentials);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiError;

        throw {
          message: serverError?.message || 'Error en las credenciales',
          status: error.response?.status || 500,
          code: serverError?.code || 'AUTH_ERROR',
        } as ApiError;
      }

      throw {
        message: 'Ocurrió un error inesperado',
        status: 500,
      } as ApiError;
    }
  },
};
