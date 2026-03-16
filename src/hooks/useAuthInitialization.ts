import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeAuth } from '../store/slices/auth/thunks';

export const useAuthInitialization = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated, isInitializing, storageError } = useAppSelector(state => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return { isAuthenticated, isInitializing, storageError };
};
