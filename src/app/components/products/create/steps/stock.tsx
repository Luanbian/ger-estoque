import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { actions } from "../../../../../features/products";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { useForm } from "react-hook-form";
import { IconArrowBack, IconArrowForward } from "@tabler/icons-react";

interface StockForm {
  stock: number;
  minStock: number;
}

interface Props {
  actions: {
    nextStep: (value: StockForm) => void;
    prevStep: () => void;
  };
  data: {
    stock?: number;
    minStock?: number;
  };
}

const StepStockComponent = ({ actions, data }: Props) => {
  const { nextStep, prevStep } = actions;
  const { stock, minStock } = data;
  const { register, handleSubmit } = useForm<StockForm>();

  const onSubmit = (data: StockForm) => {
    nextStep(data);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ mb: 3, fontWeight: 600 }}
        >
          Estoque do Produto
        </Typography>

        <Stack spacing={3}>
          <TextField
            type="number"
            label="Quantidade em Estoque"
            placeholder="Ex: 100"
            variant="outlined"
            fullWidth
            defaultValue={stock}
            {...register("stock", { required: true, valueAsNumber: true })}
          />

          <TextField
            type="number"
            label="Estoque Mínimo"
            placeholder="Ex: 10"
            variant="outlined"
            fullWidth
            {...register("minStock", { required: true, valueAsNumber: true })}
            defaultValue={minStock}
            helperText="Quantidade mínima para alerta de reposição"
          />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<IconArrowBack />}
              sx={{ minWidth: 120 }}
              onClick={prevStep}
            >
              Voltar
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<IconArrowForward />}
              onClick={handleSubmit(onSubmit)}
              sx={{ minWidth: 120 }}
            >
              Próximo
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export const StepStock = () => {
  const dispatch = useDispatch();
  const { registerForm, registerSteps } = useSelector((state) => state.product);

  const prevStep = () => {
    dispatch(
      actions.setRegisterSteps({
        status: "variant",
        steps: { ...registerSteps.steps, stock: false },
      })
    );
  };

  const nextStep = (value: StockForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "price",
        steps: { ...registerSteps.steps, stock: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        ...registerForm!,
        stock: value.stock,
        minStock: value.minStock,
      })
    );
  };

  return (
    <StepStockComponent
      actions={{ nextStep, prevStep }}
      data={{
        stock:
          registerForm && "stock" in registerForm
            ? registerForm.stock
            : undefined,
        minStock:
          registerForm && "minStock" in registerForm
            ? registerForm.minStock
            : undefined,
      }}
    />
  );
};
