import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SalesComponent } from "./page";
import { actions } from "../../../features/sales";

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

  return <SalesComponent data={{ sales: data, products }} />;
};
