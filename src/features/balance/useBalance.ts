import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBalance } from '../../store/slices/balance/thunk';

export const useBalance = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(state => state.balance);

  useEffect(() => {
    if (!data && !isLoading) {
      dispatch(fetchBalance());
    }
  }, [dispatch, data, isLoading]);

  return {
    amount: data?.balance ?? 0,
    currency: data?.currency ?? 'ARS',
    isLoading,
    error,
    refetch: () => dispatch(fetchBalance()),
  };
};
