import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../../api/authApi';
import { getToken, saveToken } from '../../../utils/storage';
import { AuthError, AuthResponse, LoginCredentials } from '../../../features/auth/types';

export const initializeAuth = createAsyncThunk<string | null, void, { rejectValue: string }>(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token || typeof token !== 'string') return null;
      return token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error de storage');
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: AuthError }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      if (!response || !response.token) {
        return rejectWithValue({
          message: 'Error en la respuesta del servidor: Token ausente',
          code: 'SERVER_CONTRACT_ERROR',
          status: 500,
        });
      }

      if (!response.user || typeof response.user.id !== 'number') {
        return rejectWithValue({
          message: 'Datos de usuario inválidos o incompletos',
          code: 'SERVER_CONTRACT_ERROR',
          status: 500,
        });
      }

      await saveToken(response.token);

      return response;
    } catch (error) {
      if (!(error as AuthError).code) {
        return rejectWithValue({
          message: 'Error inesperado durante el inicio de sesión',
          code: 'INTERNAL_ERROR',
          status: 500,
        });
      }

      return rejectWithValue(error as AuthError);
    }
  },
);
