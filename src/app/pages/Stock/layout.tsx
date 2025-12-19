import { StockPage } from "./page.tsx";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";

export const Stock = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(actions.productRequest({ page: "1", limit: "10", sort: "asc" }));
  }, []);

  if (loading || !data) {
    return <div>Carregando produtos...</div>;
  }

  return <StockPage data={data} />;
};
