import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SalesComponent } from "./page";
import { actions } from "../../../features/sales";
import { actions as productActions } from "../../../features/products";

export const Sales = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.sales);
  const { data: products } = useSelector((state) => state.product);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(actions.salesRequest());
    }
    if (products === null) {
      dispatch(
        productActions.productTreeRequest({
          page: "1",
          limit: "25",
          sort: "asc",
        }),
      );
    }
  }, [data]);

  if (loading || !data) {
    return <div>Loading sales...</div>;
  }

  return <SalesComponent data={{ sales: data, products }} />;
};
