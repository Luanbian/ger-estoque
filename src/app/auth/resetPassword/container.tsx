import { useEffect } from "react";
import { toast } from "react-toastify";
import { actions } from "../../../features/auth";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ResetPasswordComponent } from "./component";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { error, loading, resetPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (newPassword: string) => {
    dispatch(actions.resetPasswordRequest({ token, newPassword }));
  };

  const handleRequestNewLink = () => {
    navigate("/forgot-password");
  };

  useEffect(() => {
    dispatch(actions.setError(null));
  }, []);

  useEffect(() => {
    if (!resetPasswordMessage) return;
    toast.success(resetPasswordMessage);
    dispatch(actions.setResetPasswordMessage(undefined));
    navigate("/login");
  }, [resetPasswordMessage]);

  return (
    <ResetPasswordComponent
      error={error}
      loading={loading}
      onResetPassword={handleResetPassword}
      onRequestNewLink={handleRequestNewLink}
    />
  );
};
