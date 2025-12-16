export interface APIResponse<T> {
  transactionId: string;
  message: string;
  data: T;
  error?: string;
}
