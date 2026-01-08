import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { ForgotPasswordPayload } from "../../../features/auth/types";

interface Props {
  onForgotPassword: (data: ForgotPasswordPayload) => void;
  loading: boolean;
  error: string | null;
}

export const ForgotPasswordComponent = ({
  onForgotPassword,
  loading,
  error,
}: Props) => {
  const { register, handleSubmit } = useForm<ForgotPasswordPayload>();

  const onSubmit = (data: ForgotPasswordPayload) => {
    onForgotPassword(data);
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
            Esqueci minha senha
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Enviando..." : "Enviar instruções"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
