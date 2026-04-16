import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SaleComponent } from "./page";
import { actions } from "../../../features/order";
import { actions as wpActions } from "../../../features/whatsapp";

export const Sale = () => {
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.ws);
  const { data, loading, pagination } = useSelector((state) => state.order);
  const { data: whatsapp } = useSelector((state) => state.whatsapp);

  useEffect(() => {
    if (whatsapp === null) {
      dispatch(wpActions.whatsappRequest());
    }
  }, [whatsapp, data]);

  useEffect(() => {
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
      data={{ orders: data, loading, pagination, whatsapp }}
      actions={{ onChangePage }}
    />
  );
};
