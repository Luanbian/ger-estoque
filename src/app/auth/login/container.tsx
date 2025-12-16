import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../store/hooks";
import { actions } from "../../../features/auth";
import { LoginComponent } from "./component";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = (email: string, password: string) => {
    dispatch(actions.loginRequest({ email, password }));
  };

  return (
    <LoginComponent onLogin={handleLogin} loading={loading} error={error} />
  );
};
