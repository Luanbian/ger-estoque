import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { actions as catalogActions } from "../../../features/catalog";
import { actions as showcaseActions } from "../../../features/showcase";
import { CatalogPage } from "./page";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.catalog);
  const { data: showcase } = useSelector((state) => state.showcase);
  const showcaseId = useSelector((state) => state.showcase.data?._id ?? "");

  useEffect(() => {
    if (showcase === null) {
      dispatch(showcaseActions.showcaseRequest());
    }
    if (data.category === null && showcase?._id) {
      dispatch(catalogActions.catalogRequest());
    }
  }, [data.category, showcase]);

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
