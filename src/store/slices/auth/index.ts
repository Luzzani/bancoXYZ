import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isInitializing: true,
  storageError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.storageError = null;
    },
    hydrateAuth: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isInitializing = false;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.storageError = action.payload;
      state.isInitializing = false;
    },
    logout: state => {
      state.token = null;
      state.isAuthenticated = false;
      state.storageError = null;
    },
  },
});

export const { hydrateAuth, logout, setAuthError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
