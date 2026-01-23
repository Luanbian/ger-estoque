import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SalesComponent } from "./page";
import { actions } from "../../../features/sales";

export const Sales = () => {
  const dispatch = useDispatch();
  const { data, loading, pagination } = useSelector((state) => state.sales);

  const onChangePage = (page: number) => {
    dispatch(
      actions.salesRequest({ page: page.toString(), limit: "25", sort: "asc" }),
    );
  };

  useEffect(() => {
    if (data === null) {
      dispatch(actions.salesRequest({ page: "1", limit: "25", sort: "asc" }));
    }
  }, [data]);

  return (
    <SalesComponent
      data={{ sales: data, loading, pagination }}
      actions={{ onChangePage }}
    />
  );
};
