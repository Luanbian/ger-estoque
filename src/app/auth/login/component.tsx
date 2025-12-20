import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../../features/auth/types";

interface Props {
  onLogin: (username: string, password: string) => void;
  loading: boolean;
  error: string | null;
}

export const LoginComponent = ({ onLogin, loading, error }: Props) => {
  const { register, handleSubmit } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    onLogin(data.email, data.password);
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
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

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
        </CardContent>
      </Card>
    </Box>
  );
};
