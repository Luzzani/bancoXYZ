import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchHistory } from '../../../store/slices/history/thunk';

export const useTransferHistory = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector(state => state.history);

  const loadHistory = useCallback(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    items,
    isLoading,
    error,
    refreshHistory: loadHistory,
  };
};
