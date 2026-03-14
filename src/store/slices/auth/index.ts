import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { initializeAuth, login } from './thunks';
import { AuthError } from '../../../features/auth/types';

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  isLoading: false,
  storageError: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.storageError = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeAuth.pending, state => {
        state.isInitializing = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isInitializing = false;
        state.token = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isInitializing = false;
        state.storageError = action.payload ?? 'Error de inicialización';
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
