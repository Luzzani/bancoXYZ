export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  storageError: string | null;
}
