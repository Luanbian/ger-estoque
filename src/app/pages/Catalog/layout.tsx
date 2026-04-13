import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { actions as catalogActions } from "../../../features/catalog";
import { CatalogPage } from "./page";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.catalog);
  const showcaseId = useSelector((state) => state.showcase.data?._id ?? "");

  useEffect(() => {
    if (data.category === null) {
      dispatch(catalogActions.catalogRequest());
    }
  }, [data.category]);

  return (
    <CatalogPage
      data={{
        categories: data.category,
        items: data.items,
        loading,
        showcaseId,
      }}
    />
  );
};
