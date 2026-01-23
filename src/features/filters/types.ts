import { ProductType } from "../common/productTypeEnum";
import { StockStatusEnum } from "../common/stockStatusEnum";

export interface Filters {
  product: FilterProduct;
  category: FilterCategory;
  sales: SalesFilters;
}

export interface FilterProduct {
  name?: string;
  categoryId?: string;
  unitOfMeasureId?: string;
  type?: ProductType;
  stockStatus?: StockStatusEnum;
}

export interface FilterCategory {
  name?: string;
}

export interface SalesFilters {
  quantityMin?: number;
  quantityMax?: number;
  salePriceMin?: number;
  salePriceMax?: number;
  productsIds?: string[];
}
