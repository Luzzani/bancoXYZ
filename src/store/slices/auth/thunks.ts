import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../../api/authApi';
import { getToken, getUserData, saveToken, saveUserData } from '../../../utils/storage';
import { AuthResponse, LoginCredentials } from '../../../features/auth/types';
import { ApiError } from '../../../api/types';
import { AuthData } from './types';

export const initializeAuth = createAsyncThunk<AuthData | null, void, { rejectValue: string }>(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const [token, user] = await Promise.all([getToken(), getUserData()]);

      if (token && user) {
        return { token, user };
      }

      return null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error de storage');
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: ApiError }>(
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
      await saveUserData(response.user);

      return response;
    } catch (error) {
      if (!(error as ApiError).code) {
        return rejectWithValue({
          message: 'Error inesperado durante el inicio de sesión',
          code: 'INTERNAL_ERROR',
          status: 500,
        });
      }

      return rejectWithValue(error as ApiError);
    }
  },
);
