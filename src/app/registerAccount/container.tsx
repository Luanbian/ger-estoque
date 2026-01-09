import { toast } from "react-toastify";
import { actions } from "../../features/accountShopkeeper";
import { CreateAccountShopkeeperPayload } from "../../features/accountShopkeeper/types";
import { useDispatch, useSelector } from "../../store/hooks";
import { RegisterAccountComponent } from "./component";
import { useNavigate } from "react-router-dom";

export const RegisterAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, responseMessage } = useSelector(
    (state) => state.accountShopkeeper
  );
  const {
    loading: planTypeLoading,
    error: planTypeError,
    data,
  } = useSelector((state) => state.planType);

  const handleRegisterAccount = (data: CreateAccountShopkeeperPayload) => {
    dispatch(actions.registerAccountRequest(data));
  };

  if (responseMessage) {
    toast.success(responseMessage);
    dispatch(actions.setResponseMessage(undefined));
    navigate("/login");
  }

  return (
    <RegisterAccountComponent
      data={{
        loading,
        error,
        planTypeLoading,
        planTypeError,
        planTypes: data,
      }}
      actions={{
        onRegisterAccount: handleRegisterAccount,
      }}
    />
  );
};
