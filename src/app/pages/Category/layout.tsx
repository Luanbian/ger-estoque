import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { CategoryPage } from "./page.tsx";
import actions from "../../../features/categories/slice.ts";

export const Category = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.category);

  const createCategory = () => {
    dispatch(
      actions.createCategoryRequest({
        name: "Nova Categoria",
      })
    );
  };

  useEffect(() => {
    dispatch(actions.categoryRequest());
  }, []);

  if (loading || !data) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <CategoryPage data={{ categories: data }} actions={{ createCategory }} />
  );
};
