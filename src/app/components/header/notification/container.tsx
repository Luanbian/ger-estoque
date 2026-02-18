import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { NotificationHeaderComponent } from "./component";
import { actions as wsActions } from "../../../../features/ws";
import { actions as orderActions } from "../../../../features/order";

export const NotificationHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ws);

  const navigateToSale = () => {
    navigate("/sale");
  };

  const clearNotifications = () => {
    if (notifications.length > 0) {
      dispatch(wsActions.clearNotifications());
    }
  };

  useEffect(() => {
    if (notifications.length > 0) {
      toast.success("Você tem um novo pedido!");
      dispatch(orderActions.getOrdersRequest());
    }
  }, [notifications]);

  return (
    <NotificationHeaderComponent
      data={{ notifications }}
      actions={{ navigateToSale, clearNotifications }}
    />
  );
};
