import { createSlice } from '@reduxjs/toolkit';
import { executeTransfer } from './thunk';
import { TransferState } from './types';

const initialState: TransferState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

const transferSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    resetTransferStatus: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(executeTransfer.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(executeTransfer.fulfilled, state => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(executeTransfer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTransferStatus } = transferSlice.actions;
export default transferSlice.reducer;
