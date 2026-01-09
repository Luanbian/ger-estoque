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
import { CreateAccountShopkeeperPayload } from "../../features/accountShopkeeper/types";

interface Props {
  onRegisterAccount: (data: CreateAccountShopkeeperPayload) => void;
  loading: boolean;
  error: string | null;
}

export const RegisterAccountComponent = ({
  onRegisterAccount,
  loading,
  error,
}: Props) => {
  const { register, handleSubmit } = useForm<CreateAccountShopkeeperPayload>();

  const onSubmit = (data: CreateAccountShopkeeperPayload) => {
    onRegisterAccount(data);
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
            Criar Conta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Nome"
              {...register("name")}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              label="CNPJ"
              {...register("cnpj")}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              label="Email"
              {...register("auth.email")}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              label="Senha"
              type="password"
              {...register("auth.password")}
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
              {loading ? "Criando..." : "Criar Conta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
