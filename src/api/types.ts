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

export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
  transferDate: string;
}

export interface TransferResponse {
  status: 'success' | 'error';
  message?: string;
}

export interface TransferHistoryItem {
  value: number;
  date: string;
  currency: string;
  payeer: {
    document: string;
    name: string;
  };
}
