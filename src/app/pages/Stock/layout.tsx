import { StockPage } from "./page.tsx";
import { useDispatch } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";

export const Stock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.productRequest({ page: "1", limit: "10", sort: "asc" }));
  }, []);

  return <StockPage />;
};
