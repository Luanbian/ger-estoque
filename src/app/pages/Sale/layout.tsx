import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SaleComponent } from "./page";
import { actions as wsActions } from "../../../features/ws";
import { actions } from "../../../features/order";

export const Sale = () => {
  const dispatch = useDispatch();
  const { notifications, isConnected } = useSelector((state) => state.ws);
  const { data, loading, pagination } = useSelector((state) => state.order);

  useEffect(() => {
    if (notifications.length > 0) {
      dispatch(wsActions.clearNotifications());
    }
    dispatch(actions.getOrdersRequest());
  }, []);

  const onChangePage = (page: number) => {
    dispatch(
      actions.getOrdersRequest({
        page: page.toString(),
        limit: "25",
        sort: "asc",
      }),
    );
  };

  if (!isConnected) {
    return <div>Conectando ao Servidor...</div>;
  }

  return (
    <SaleComponent
      data={{ orders: data, loading, pagination }}
      actions={{ onChangePage }}
    />
  );
};
