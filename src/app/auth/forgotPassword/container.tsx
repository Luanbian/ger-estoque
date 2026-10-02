import { useEffect } from "react";
import { toast } from "react-toastify";
import { actions } from "../../../features/auth";
import { ForgotPasswordPayload } from "../../../features/auth/types";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ForgotPasswordComponent } from "./component";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, forgotPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (data: ForgotPasswordPayload) => {
    dispatch(actions.forgotPasswordRequest(data));
  };

  useEffect(() => {
    dispatch(actions.setError(null));
  }, []);

  useEffect(() => {
    if (!forgotPasswordMessage) return;
    toast.success(forgotPasswordMessage);
    dispatch(actions.setForgotPasswordMessage(undefined));
    navigate("/login");
  }, [forgotPasswordMessage]);

  return (
    <ForgotPasswordComponent
      onForgotPassword={handleForgotPassword}
      loading={loading}
      error={error}
    />
  );
};
