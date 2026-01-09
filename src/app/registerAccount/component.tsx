import { useState } from "react";
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
import { ModalComponent } from "../components/modal";
import { Plans } from "../components/plans";
import { PlanType } from "../../features/plans/types";

interface Props {
  data: {
    planTypes: PlanType[] | null;
    loading: boolean;
    error: string | null;
    planTypeLoading: boolean;
    planTypeError: string | null;
  };
  actions: {
    onRegisterAccount: (data: CreateAccountShopkeeperPayload) => void;
    selectedPlanType: (planTypeId: string) => void;
  };
}

export const RegisterAccountComponent = ({ data, actions }: Props) => {
  const { loading, error, planTypeError, planTypeLoading, planTypes } = data;
  const { onRegisterAccount, selectedPlanType } = actions;
  const { register, handleSubmit } = useForm<CreateAccountShopkeeperPayload>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: CreateAccountShopkeeperPayload) => {
    onRegisterAccount(data);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
              type="button"
              sx={{ mt: 2 }}
              disabled={loading}
              onClick={handleOpenModal}
            >
              {loading ? "Criando..." : "Criar Conta"}
            </Button>

            <ModalComponent
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              maxWidth={900}
              maxHeight={900}
              content={
                <Plans
                  data={{
                    error: planTypeError,
                    loading: planTypeLoading,
                    planTypes,
                  }}
                  actions={{ selectedPlanType }}
                />
              }
            />
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
