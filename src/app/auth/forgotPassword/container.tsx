import { toast } from "react-toastify";
import { actions } from "../../../features/auth";
import { ForgotPasswordPayload } from "../../../features/auth/types";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ForgotPasswordComponent } from "./component";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, forgotPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (data: ForgotPasswordPayload) => {
    dispatch(actions.forgotPasswordRequest(data));
  };

  if (forgotPasswordMessage) {
    toast.success(forgotPasswordMessage);
    dispatch(actions.setForgotPasswordMessage(undefined));
  }

  return (
    <ForgotPasswordComponent
      onForgotPassword={handleForgotPassword}
      loading={loading}
      error={error}
    />
  );
};
