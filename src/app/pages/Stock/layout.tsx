import { StockPage } from "./page.tsx";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { actions } from "../../../features/products";
import { actions as categoryActions } from "../../../features/categories";

export const Stock = () => {
  const dispatch = useDispatch();
  const { data, loading, pagination } = useSelector((state) => state.product);
  const { dataPlain: categories } = useSelector((state) => state.category);

  const resetForm = () => {
    dispatch(actions.resetRegister());
  };

  const onChangePage = (page: number) => {
    dispatch(
      actions.productTreeRequest({
        page: page.toString(),
        limit: "25",
        sort: "asc",
      }),
    );
  };

  useEffect(() => {
    if (data === null) {
      dispatch(
        actions.productTreeRequest({ page: "1", limit: "25", sort: "asc" }),
      );
    }
    if (!categories || categories.length === 0) {
      dispatch(categoryActions.categoryRequest());
    }
  }, [data, categories]);

  if (!categories) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <StockPage
      data={{ products: data, categories, loading, pagination }}
      actions={{ resetForm, onChangePage }}
    />
  );
};
