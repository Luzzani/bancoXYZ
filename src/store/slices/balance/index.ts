import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance } from './thunk';
import { BalanceState } from '../../../api/types';

const initialState: BalanceState = {
  data: null,
  isLoading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    clearBalance: state => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBalance.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Error al obtener el saldo';
      });
  },
});

export const { clearBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
