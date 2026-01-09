import { actions } from "../../features/accountShopkeeper";
import { CreateAccountShopkeeperPayload } from "../../features/accountShopkeeper/types";
import { useDispatch, useSelector } from "../../store/hooks";
import { RegisterAccountComponent } from "./component";

export const RegisterAccount = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.accountShopkeeper);

  const handleRegisterAccount = (data: CreateAccountShopkeeperPayload) => {
    dispatch(actions.registerAccountRequest(data));
  };

  return (
    <RegisterAccountComponent
      onRegisterAccount={handleRegisterAccount}
      loading={loading}
      error={error}
    />
  );
};
