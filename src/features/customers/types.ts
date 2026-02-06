import { CustomerStatusEnum } from "../common/customerStatusEnum";
import { Pagination } from "../common/types";

export interface Customer {
  _id: string;
  tenantId: string;
  name: string;
  phone: string;
  salesIds?: string[];
  invoicing: number;
  status: CustomerStatusEnum;
  isFavorite?: boolean;
}

export interface CustomerState {
  data: Customer[] | null;
  favorites: Customer[] | null;
  loading: boolean;
  loadingFavorites: boolean;
  error: string | null;
  pagination: Pagination | null;
  paginationFavorites: Pagination | null;
  maxSpent: number | null;
  maxSpentFavorites: number | null;
}

export interface CreateCustomerPayload {
  name: string;
  phone: string;
  lastSaleId?: string;
}
