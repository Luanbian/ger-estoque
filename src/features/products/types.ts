import { ProductType } from "../common/productTypeEnum.ts";
import { StockStatusEnum } from "../common/stockStatusEnum.ts";

export interface Product {
  _id: string;
  sku: string;
  name: string;
  tenantId: string;
  type: ProductType;
  categoryId: string;
  unitOfMeasureId: string;
  hasVariants: boolean;
  parentProductId: string | null;
  variantAttributes: VariantAttributes[] | null;
  stock: number;
  minStock: number;
  unitPrice: number;
  salePrice: number;
  stockStatus: StockStatusEnum;
  variants: Product[] | null;
}

export interface VariantAttributes {
  _id?: string;
  type: string;
  value: string | string[];
}

export interface ProductState {
  data: Product[] | null;
  dataPlain: Product[] | null;
  loading: boolean;
  error: string | null;
  registerSteps: RegisterSteps;
  registerForm: ProductPayload | CreateProductWithVariantPayload | null;
}

export interface RegisterSteps {
  status: "identification" | "category" | "variant" | "stock" | "price";
  steps: {
    identification: boolean;
    category: boolean;
    variant: boolean;
    stock: boolean;
    price: boolean;
  };
}

export interface RequestTreeProduct {
  page?: string;
  limit?: string;
  sort?: string;
}

export interface ProductPayload {
  name: string;
  type: ProductType;
  categoryId: string;
  unitOfMeasureId: string;
  salePrice?: number;
  unitPrice?: number;
  stock?: number;
  minStock?: number;
  hasVariants: boolean;
}

export interface CreateProductWithVariantPayload {
  name: string;
  type: ProductType;
  categoryId: string;
  unitOfMeasureId: string;
  hasVariants: boolean;
  variants: AddVariantPayload[];
}

export interface AddVariantPayload {
  name: string;
  attributes: VariantAttributes[] | null;
  stock: number;
  minStock: number;
  unitPrice: number;
  salePrice: number;
}

export interface UpdateVariantPayload {
  id: string;
  name?: string;
  type?: ProductType;
  categoryId?: string;
  unitOfMeasureId?: string;
  attributes?: VariantAttributes[] | null;
  stock?: number;
  minStock?: number;
  unitPrice?: number;
  salePrice?: number;
}
