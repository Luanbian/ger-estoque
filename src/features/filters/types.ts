import { ProductType } from "../common/productTypeEnum";
import { StockStatusEnum } from "../common/stockStatusEnum";

export interface Filters {
  product: FilterProduct;
  category: FilterCategory;
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
