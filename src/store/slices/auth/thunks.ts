import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../utils/storage';
import { hydrateAuth, setAuthError } from '.';
import { StorageError } from '../../../utils/types';

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { dispatch }) => {
  try {
    const token = await getToken();
    dispatch(hydrateAuth(token));
  } catch (error: unknown) {
    if (error instanceof StorageError) {
      dispatch(setAuthError(error.message));
    } else {
      dispatch(setAuthError('Error inesperado al iniciar sesión segura'));
    }
  }
});
