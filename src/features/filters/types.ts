import { CustomerStatusEnum } from "../common/customerStatusEnum";
import { OrderStatus } from "../common/orderStatusEnum";
import { ProductType } from "../common/productTypeEnum";
import { StockStatusEnum } from "../common/stockStatusEnum";

export interface Filters {
  product: ProductFilters;
  category: CategoryFilters;
  sales: SalesFilters;
  sale: SaleFilters;
  customer: CustomerFilters;
  favorites: CustomerFilters;
}

export interface ProductFilters {
  name?: string;
  categoryId?: string;
  unitOfMeasureId?: string;
  type?: ProductType;
  stockStatus?: StockStatusEnum;
}

export interface CategoryFilters {
  name?: string;
}

export interface SalesFilters {
  salePriceMin?: number;
  salePriceMax?: number;
}

export interface CustomerFilters {
  name?: string;
  phone?: string;
  invoicingMin?: number;
  invoicingMax?: number;
  status?: CustomerStatusEnum;
}

export interface SaleFilters {
  status?: OrderStatus;
}
