import { createAsyncThunk } from '@reduxjs/toolkit';
import { balanceApi } from '../../../api/balanceApi';
import { ApiError, BalanceResponse } from '../../../api/types';

export const fetchBalance = createAsyncThunk<BalanceResponse, void, { rejectValue: ApiError }>(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      return await balanceApi.getBalance();
    } catch (error) {
      return rejectWithValue(error as ApiError);
    }
  },
);
