import axios from 'axios';
import { AuthError, AuthResponse, LoginCredentials } from '../features/auth/types';
import { apiClient } from './apiClient';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/login', credentials);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as AuthError;

        throw {
          message: serverError?.message || 'Error en las credenciales',
          status: error.response?.status || 500,
          code: serverError?.code || 'AUTH_ERROR',
        } as AuthError;
      }

      throw {
        message: 'Ocurrió un error inesperado',
        status: 500,
      } as AuthError;
    }
  },
};
