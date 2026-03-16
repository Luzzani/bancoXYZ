import { createAsyncThunk } from '@reduxjs/toolkit';
import { transferListApi } from '../../../api/transferListApi';
import { ApiError } from '../../../api/types';

export const fetchHistory = createAsyncThunk('history/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await transferListApi.getHistory();
    return response;
  } catch (error: any) {
    const apiError = error as ApiError;
    return rejectWithValue(apiError.message || 'Error al cargar el historial');
  }
});
