import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { CategoryPage } from "./page.tsx";
import actions from "../../../features/categories/slice.ts";

export const Category = () => {
  const dispatch = useDispatch();
  const { data, loading, pagination } = useSelector((state) => state.category);

  const onChangePage = (page: number) => {
    dispatch(
      actions.categoryTreeRequest({
        page: page.toString(),
        limit: "25",
        sort: "asc",
      }),
    );
  };

  useEffect(() => {
    if (data === null) {
      dispatch(
        actions.categoryTreeRequest({
          page: "1",
          limit: "25",
          sort: "asc",
        }),
      );
    }
  }, [data]);

  return (
    <CategoryPage
      data={{ categories: data, loading, pagination }}
      actions={{ onChangePage }}
    />
  );
};
