import { AddVariantPayload } from "../features/products/types";

export const createEmptyVariant = () => ({
  name: "",
  attributes: [{ type: "", value: "" }],
  stock: 0,
  minStock: 0,
  unitPrice: 0,
  salePrice: 0,
});

export const normalizeVariant = (variant: Partial<AddVariantPayload>) => ({
  name: variant.name ?? "",
  attributes: variant.attributes?.length
    ? variant.attributes
    : [{ type: "", value: "" }],
  stock: variant.stock ?? 0,
  minStock: variant.minStock ?? 0,
  unitPrice: variant.unitPrice ?? 0,
  salePrice: variant.salePrice ?? 0,
});
