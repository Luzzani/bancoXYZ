import { createSlice } from '@reduxjs/toolkit';
import { fetchHistory } from './thunk';
import { HistoryState } from '../../../api/types';

const initialState: HistoryState = {
  items: [],
  isLoading: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHistory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default historySlice.reducer;
