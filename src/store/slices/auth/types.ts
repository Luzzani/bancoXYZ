import { ApiError } from '../../../api/types';
import { User } from '../../../features/auth/types';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  storageError: string | null;
  user: User | null;
  isLoading: boolean;
  error: ApiError | null;
}
