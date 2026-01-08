import { toast } from "react-toastify";
import { actions } from "../../../features/auth";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ResetPasswordComponent } from "./component";
import { useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { error, loading, resetPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (newPassword: string) => {
    dispatch(actions.resetPasswordRequest({ token, newPassword }));
  };

  if (resetPasswordMessage) {
    toast.success(resetPasswordMessage);
    dispatch(actions.setResetPasswordMessage(undefined));
  }

  return (
    <ResetPasswordComponent
      error={error}
      loading={loading}
      onResetPassword={handleResetPassword}
    />
  );
};
