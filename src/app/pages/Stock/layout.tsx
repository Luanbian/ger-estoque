import { StockPage } from "./page.tsx";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";

export const Stock = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.product);
  const { dataPlain: categories } = useSelector((state) => state.category);

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
    <StockPage data={{ products: data, categories }} actions={{ resetForm }} />
  );
};
