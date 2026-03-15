export interface ApiError {
  message: string;
  status?: number;
  code: string;
}

export interface BalanceResponse {
  balance: number;
  currency: string;
  lastMovement: string;
}

export interface BalanceState {
  data: BalanceResponse | null;
  isLoading: boolean;
  error: string | null;
}
