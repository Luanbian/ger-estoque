import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../store/hooks";
import { actions as authActions } from "../../../features/auth";
import { HeaderComponent } from "./component";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.accountShopkeeper);

  const logout = () => {
    dispatch(authActions.logout());
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <HeaderComponent
      data={{ avatar: data?.accountShopkeeper?.avatar }}
      actions={{ logout, navigateToProfile }}
    />
  );
};
