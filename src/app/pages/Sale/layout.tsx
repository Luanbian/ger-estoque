import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SaleComponent } from "./page";
import { actions } from "../../../features/ws";

export const Sale = () => {
  const dispatch = useDispatch();
  const { notifications, isConnected } = useSelector((state) => state.ws);

  useEffect(() => {
    if (notifications.length > 0) {
      dispatch(actions.clearNotifications());
    }
  }, []);

  if (!isConnected) {
    return <div>Conectando ao Servidor...</div>;
  }

  return <SaleComponent data={{ notifications }} />;
};
