import { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchHistory } from '../../../store/slices/history/thunk';
import { ApiError } from '../../../api/types';

export const useTransferHistory = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector(state => state.history);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      await dispatch(fetchHistory()).unwrap();
    } catch (e) {
      const error = e as ApiError;
      console.error(`[useTransferHistory] Error fetching history: ${error.message}`, error);
    }
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadHistory();
    setIsRefreshing(false);
  }, [loadHistory]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    items,
    isLoading,
    isRefreshing,
    error,
    refreshHistory: onRefresh,
  };
};
