import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { actions } from "../../features/accountShopkeeper";
import { actions as paymentActions } from "../../features/payment";
import { CreateAccountShopkeeperPayload } from "../../features/accountShopkeeper/types";
import { useDispatch, useSelector } from "../../store/hooks";
import { RegisterAccountComponent } from "./component";
import { CreatePaymentPayload } from "../../features/payment/types";
import { CustomerType } from "../../features/common/customerTypeEnum";
import { PlanType } from "../../features/plans/types";

export const RegisterAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, responseMessage } = useSelector(
    (state) => state.accountShopkeeper,
  );
  const {
    loading: planTypeLoading,
    error: planTypeError,
    data: planTypes,
  } = useSelector((state) => state.planType);
  const { data: paymentData } = useSelector((state) => state.payment);

  const handleRegisterAccount = (data: CreateAccountShopkeeperPayload) => {
    dispatch(actions.registerAccountRequest(data));
    handleCreateCheckout(data);
  };

  const handleCreateCheckout = (data: CreateAccountShopkeeperPayload) => {
    const checkoutPayload: CreatePaymentPayload = {
      planId:
        planTypes?.find(
          (plan: PlanType) => plan._id! === data.subscription.planTypeId,
        )?.planId || "",
      customerData: {
        name: data.name,
        email: data.auth.email,
        type:
          data.cnpj.length <= 14
            ? CustomerType.INDIVIDUAL
            : CustomerType.COMPANY,
        document: data.cnpj,
      },
    };

    dispatch(paymentActions.createCheckoutRequest(checkoutPayload));
  };

  if (paymentData?.checkoutLink) {
    const fetchImport = async () => {
      const { open } = await import("@tauri-apps/plugin-shell");
      await open(paymentData.checkoutLink!);
    };
    fetchImport().catch((error) => {
      return toast.error(`Erro ao abrir link de pagamento: ${error.message}`);
    });
  }

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
        planTypes,
      }}
      actions={{
        onRegisterAccount: handleRegisterAccount,
      }}
    />
  );
};
