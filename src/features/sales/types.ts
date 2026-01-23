import { Pagination } from "../common/types";

export interface Sales {
  _id: string;
  tenantId: string;
  products: Record<
    string,
    { quantity: number; costPrice: number; salePrice: number }
  >;
  createdAt: string;
}

export interface SalesState {
  data: Sales[] | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
}

export interface CreateSalePayload {
  [key: string]: string | number;
}
