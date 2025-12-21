import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { CategoryPage } from "./page.tsx";
import actions from "../../../features/categories/slice.ts";
import { CreateCategoryPayload } from "../../../features/categories/types.ts";

export const Category = () => {
  const dispatch = useDispatch();
  const { data, dataPlain, loading } = useSelector((state) => state.category);

  const createCategory = (value: CreateCategoryPayload) => {
    if (value.fatherCategoryId) {
      dispatch(actions.createSubCategoryRequest(value));
      return;
    }

    dispatch(actions.createCategoryRequest(value));
  };

  useEffect(() => {
    dispatch(actions.categoryTreeRequest());
    dispatch(actions.categoryRequest());
  }, []);

  if (loading || !data || !dataPlain) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <CategoryPage
      data={{ categories: data, categoriesPlain: dataPlain }}
      actions={{ createCategory }}
    />
  );
};
