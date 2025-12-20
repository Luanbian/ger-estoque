import { StockPage } from "./page.tsx";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";
import { CreateProductPayload } from "../../../features/products/types.ts";

export const Stock = () => {
  const dispatch = useDispatch();
  const { data, loading, registerSteps, registerForm } = useSelector(
    (state) => state.product
  );

  const createProduct = (value: CreateProductPayload) => {
    dispatch(actions.createProductRequest(value));
  };

  useEffect(() => {
    dispatch(actions.productRequest({ page: "1", limit: "10", sort: "asc" }));
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
