import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, TransferRequest } from '../../../api/types';
import { transferApi } from '../../../api/transferApi';
import { fetchBalance } from '../balance/thunk';
import { fetchHistory } from '../history/thunk';

export const executeTransfer = createAsyncThunk(
  'transfers/execute',
  async (transferData: TransferRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await transferApi.sendTransfer(transferData);

      if (response.status === 'success') {
        await Promise.all([dispatch(fetchBalance()), dispatch(fetchHistory())]);
        return response;
      }

      return rejectWithValue('La operación no pudo ser procesada');
    } catch (error: any) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Error al realizar la transferencia');
    }
  },
);
