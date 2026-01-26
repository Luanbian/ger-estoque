import { Pagination } from "../common/types";

export interface Customer {
  _id: string;
  tenantId: string;
  name: string;
  phone: string;
  salesIds?: string[];
  invoicing: number;
}

export interface CustomerState {
  data: Customer[] | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
}

export interface CreateCustomerPayload {
  name: string;
  phone: string;
  lastSaleId?: string;
}
