import { createAsyncThunk } from '@reduxjs/toolkit';
import { balanceApi, BalanceResponse } from '../../../api/balanceApi';
import { AuthError } from '../../../features/auth/types';

export const fetchBalance = createAsyncThunk<BalanceResponse, void, { rejectValue: ApiError }>(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      return await balanceApi.getBalance();
    } catch (error) {
      return rejectWithValue(error as AuthError);
    }
  },
);
