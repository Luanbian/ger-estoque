import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SalesComponent } from "./page";
import { actions } from "../../../features/sales";

export const Sales = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.sales);

  useEffect(() => {
    if (data === null) {
      dispatch(actions.salesRequest());
    }
  }, [data]);

  return <SalesComponent data={{ sales: data, loading }} />;
};
