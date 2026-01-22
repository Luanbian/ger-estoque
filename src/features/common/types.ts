export interface APIResponse<T> {
  transactionId: string;
  message: string;
  data: T;
  error?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

export interface PaginationRequest {
  page?: string;
  limit?: string;
  sort?: string;
}
