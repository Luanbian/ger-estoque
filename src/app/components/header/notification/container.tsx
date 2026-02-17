import { useNavigate } from "react-router-dom";
import { useSelector } from "../../../../store/hooks";
import { NotificationHeaderComponent } from "./component";

export const NotificationHeader = () => {
  const navigate = useNavigate();
  const { notifications } = useSelector((state) => state.ws);

  const navigateToSale = () => {
    navigate("/sale");
  };

  return (
    <NotificationHeaderComponent
      data={{ notifications }}
      actions={{ navigateToSale }}
    />
  );
};
