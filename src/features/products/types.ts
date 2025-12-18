import { ProductType } from "../common/productTypeEnum.ts";
import { StockStatusEnum } from "../common/stockStatusEnum.ts";

export interface Product {
  _id: string;
  sku: string;
  name: string;
  tenantId: string;
  type: ProductType;
  unitOfMeasureId: string;
  hasVariants: boolean;
  parentProductId: string | null;
  variantAttributes: VariantAttributes | null;
  stock: number;
  minStock: number;
  unitPrice: number | null;
  salePrice: number | null;
  stockStatus: StockStatusEnum;
  variants: Product[] | null;
}

export interface VariantAttributes {
  type: string;
  value: string | string[];
}

export interface ProductState {
  data: Product[] | null;
  loading: boolean;
  error: string | null;
}

export interface RequestProduct {
  page?: string;
  limit?: string;
  sort?: string;
}
