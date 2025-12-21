import { StockPage } from "./page.tsx";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";
import {
  CreateProductPayload,
  CreateProductWithVariantPayload,
} from "../../../features/products/types.ts";

export const Stock = () => {
  const dispatch = useDispatch();
  const { data, loading, registerSteps, registerForm } = useSelector(
    (state) => state.product
  );

  const createProduct = (
    value: CreateProductWithVariantPayload | CreateProductPayload
  ) => {
    if (value.hasVariants && value.variants.length > 0) {
      dispatch(
        actions.createProductWithVariantRequest(
          value as CreateProductWithVariantPayload
        )
      );
      return;
    }

    dispatch(actions.createProductRequest(value as CreateProductPayload));
  };

  useEffect(() => {
    dispatch(actions.productRequest({ page: "1", limit: "100", sort: "asc" }));
  }, []);

  if (loading || !data) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <StockPage
      data={{ products: data, registerSteps, registerForm }}
      actions={{ createProduct }}
    />
  );
};
