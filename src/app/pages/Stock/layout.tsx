import { StockPage } from "./page.tsx";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";
import {
  ProductPayload,
  CreateProductWithVariantPayload,
} from "../../../features/products/types.ts";

export const Stock = () => {
  const dispatch = useDispatch();
  const { data, loading, registerSteps, registerForm } = useSelector(
    (state) => state.product
  );
  const { dataPlain: categories } = useSelector((state) => state.category);

  const createProduct = (
    value: CreateProductWithVariantPayload | ProductPayload
  ) => {
    if (value.hasVariants && "variants" in value && value.variants.length > 0) {
      dispatch(
        actions.createProductWithVariantRequest(
          value as CreateProductWithVariantPayload
        )
      );
      return;
    }

    dispatch(actions.createProductRequest(value as ProductPayload));
  };

  const editProduct = (id: string, productToUpdate: ProductPayload) => {
    dispatch(actions.updateProductRequest({ id, data: productToUpdate }));
  };

  const resetForm = () => {
    dispatch(actions.resetRegister());
  };

  useEffect(() => {
    dispatch(actions.productRequest({ page: "1", limit: "100", sort: "asc" }));
  }, []);

  if (loading || !data || !categories) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <StockPage
      data={{ products: data, categories, registerSteps, registerForm }}
      actions={{ createProduct, editProduct, resetForm }}
    />
  );
};
