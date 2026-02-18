import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { NotificationHeaderComponent } from "./component";
import { actions as wsActions } from "../../../../features/ws";

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

  return (
    <NotificationHeaderComponent
      data={{ notifications }}
      actions={{ navigateToSale, clearNotifications }}
    />
  );
};
