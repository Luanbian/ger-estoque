import { Pagination } from "../common/types";

export interface Sales {
  _id: string;
  tenantId: string;
  name: string;
  items: SaleItem[];
  totals: TotalsSale;
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  unitCost: number;
  unitSale: number;
  totalCost: number;
  totalSale: number;
  _id: string;
}

export interface TotalsSale {
  costPrice: number;
  salePrice: number;
}

export interface SalesState {
  data: Sales[] | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
  maxSalesInvoicing: number | null;
}

export interface CreateSalePayload {
  name?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
  }[];
}
