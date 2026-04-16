import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../../features/auth/types";
import logoComplete from "../../../../public/logo_complete.png";

interface Props {
  data: {
    error: string | null;
    loading: boolean;
  };
  actions: {
    navigateTo: (path: string) => void;
    onLogin: (username: string, password: string) => void;
  };
}

export const LoginComponent = ({ actions, data }: Props) => {
  const { error, loading } = data;
  const { register, handleSubmit } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    actions.onLogin(data.email, data.password);
  };

  const handleForgotPassword = () => {
    actions.navigateTo("/forgot-password");
  };

  const handleRegister = () => {
    actions.navigateTo("/register");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <img src={logoComplete} alt="Logo" width={300} height={300} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              label="Senha"
              type="password"
              {...register("password")}
              margin="normal"
              required
              disabled={loading}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="text"
              sx={{ mt: 2 }}
              onClick={handleForgotPassword}
            >
              Esqueci minha senha
            </Button>
            <Button variant="text" sx={{ mt: 2 }} onClick={handleRegister}>
              Criar nova conta
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
