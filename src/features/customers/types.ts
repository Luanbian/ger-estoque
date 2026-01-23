import { Pagination } from "../common/types";

export interface Customer {
  _id: string;
  tenantId: string;
  name: string;
  phone: string;
  invoicing: number;
}

export interface CustomerState {
  data: Customer[] | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
}
