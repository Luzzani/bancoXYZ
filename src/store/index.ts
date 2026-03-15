import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import balanceReducer from './slices/balance';
import { injectStore } from '../api/apiClient';
import transferReducer from './slices/transfer';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    transfer: transferReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
