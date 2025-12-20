import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { CategoryPage } from "./page.tsx";
import actions from "../../../features/categories/slice.ts";
import { CreateCategoryPayload } from "../../../features/categories/types.ts";

export const Category = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.category);

  const createCategory = (value: CreateCategoryPayload) => {
    dispatch(actions.createCategoryRequest(value));
  };

  useEffect(() => {
    dispatch(actions.categoryTreeRequest());
  }, []);

  if (loading || !data) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <CategoryPage data={{ categories: data }} actions={{ createCategory }} />
  );
};
