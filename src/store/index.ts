import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import { injectStore } from '../api/apiClient';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
