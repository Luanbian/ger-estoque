import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { actions } from "../../../../../features/products";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  convertFromCents,
  convertToCents,
} from "../../../../../utils/convertTocents";
import { IconArrowBack, IconArrowForward } from "@tabler/icons-react";

interface PriceForm {
  unitPrice: string;
  salePrice: string;
}

interface Props {
  actions: {
    conclude: (value: PriceForm) => void;
    prevStep: () => void;
  };
  data: {
    unitPrice?: string;
    salePrice?: string;
  };
}

const StepPriceComponent = ({ actions, data }: Props) => {
  const { conclude, prevStep } = actions;
  const { unitPrice, salePrice } = data;
  const { register, handleSubmit } = useForm<PriceForm>();

  const onSubmit = (data: PriceForm) => {
    conclude(data);
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
          Preço do Produto
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Preço Unitário"
            placeholder="Ex: 10.50"
            variant="outlined"
            fullWidth
            {...register("unitPrice", { required: true })}
            helperText="Preço de custo do produto"
            defaultValue={unitPrice}
          />

          <TextField
            label="Preço de Venda"
            placeholder="Ex: 15.00"
            variant="outlined"
            fullWidth
            {...register("salePrice", { required: true })}
            helperText="Preço final para o cliente"
            defaultValue={salePrice}
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
              Concluir Cadastro
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export const StepPrice = () => {
  const dispatch = useDispatch();
  const { registerForm, registerSteps } = useSelector((state) => state.product);

  const prevStep = () => {
    dispatch(
      actions.setRegisterSteps({
        status: "stock",
        steps: { ...registerSteps.steps, price: false },
      })
    );
  };

  const conclude = (value: PriceForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "price",
        steps: { ...registerSteps.steps, price: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        ...registerForm!,
        unitPrice: convertToCents(value.unitPrice),
        salePrice: convertToCents(value.salePrice),
      })
    );
  };
  return (
    <StepPriceComponent
      actions={{ conclude, prevStep }}
      data={{
        unitPrice:
          registerForm && "unitPrice" in registerForm
            ? convertFromCents(registerForm.unitPrice!)
            : undefined,
        salePrice:
          registerForm && "salePrice" in registerForm
            ? convertFromCents(registerForm.salePrice!)
            : undefined,
      }}
    />
  );
};
