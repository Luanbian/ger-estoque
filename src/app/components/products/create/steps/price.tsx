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
import { convertToCents } from "../../../../../utils/convertTocents";

interface PriceForm {
  unitPrice: string;
  salePrice: string;
}

interface Props {
  actions: {
    conclude: (value: PriceForm) => void;
  };
}

const StepPriceComponent = ({ actions }: Props) => {
  const { conclude } = actions;
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
          />

          <TextField
            label="Preço de Venda"
            placeholder="Ex: 15.00"
            variant="outlined"
            fullWidth
            {...register("salePrice", { required: true })}
            helperText="Preço final para o cliente"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 2, py: 1.5 }}
          >
            Concluir Cadastro
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export const StepPrice = () => {
  const dispatch = useDispatch();
  const { registerForm, registerSteps } = useSelector((state) => state.product);

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
  return <StepPriceComponent actions={{ conclude }} />;
};
