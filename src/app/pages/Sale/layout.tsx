import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { SaleComponent } from "./page";
import { actions as wsActions } from "../../../features/ws";

export const Sale = () => {
  const dispatch = useDispatch();
  const { notifications, isConnected } = useSelector((state) => state.ws);

  useEffect(() => {
    dispatch(wsActions.watchEvents());
  }, []);

  if (!isConnected) {
    return <div>Conectando ao Servidor...</div>;
  }

  return <SaleComponent data={{ notifications }} />;
};
