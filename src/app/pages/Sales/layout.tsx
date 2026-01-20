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
    dispatch(actions.salesRequest());
  }, []);

  if (loading || !data) {
    return <div>Loading sales...</div>;
  }

  if (!products) {
    dispatch(
      productActions.productTreeRequest({
        page: "1",
        limit: "100",
        sort: "asc",
      }),
    );
  }

  return <SalesComponent data={{ sales: data, products }} />;
};
