import { Box, Button, Typography } from "@mui/material";
import { actions } from "../../../../../features/products";
import { useDispatch } from "../../../../../store/hooks";
import { useForm } from "react-hook-form";

interface StockForm {
  stock: number;
  minStock: number;
}

interface Props {
  actions: {
    nextStep: (value: StockForm) => void;
  };
}

const StepStockComponent = ({ actions }: Props) => {
  const { nextStep } = actions;
  const { register, handleSubmit } = useForm<StockForm>();

  const onSubmit = (data: StockForm) => {
    nextStep(data);
  };

  return (
    <Box>
      <Typography variant="h2">Estoque do Produto</Typography>

      <input
        type="number"
        {...register("stock", { required: true, valueAsNumber: true })}
        placeholder="Quantidade em Estoque"
      />

      <input
        type="number"
        {...register("minStock", { required: true, valueAsNumber: true })}
        placeholder="Estoque Mínimo"
      />

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Próximo
      </Button>
    </Box>
  );
};

export const StepStock = () => {
  const dispatch = useDispatch();

  const nextStep = (value: StockForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "price",
        steps: { stock: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        stock: value.stock,
        minStock: value.minStock,
      })
    );
  };

  return <StepStockComponent actions={{ nextStep }} />;
};
