import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks.ts";
import { FinancePage } from "./page.tsx";
import actions from "../../../features/finance/slice.ts";

export const Finance = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(actions.financialDashboardRequest());
  }, []);

  if (loading || !data) {
    return <div>Carregando dados financeiros...</div>;
  }

  return (
    <FinancePage
      data={{
        dashboard: {
          aggregate: data.aggregate,
          perProduct: data.perProduct,
          stock: data.stock,
        },
      }}
    />
  );
};
