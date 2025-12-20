import { useForm } from "react-hook-form";
import { useDispatch } from "../../../../../store/hooks";
import { actions } from "../../../../../features/products";
import { Box, Button, Typography } from "@mui/material";
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
    <Box>
      <Typography variant="h2">Preço do Produto</Typography>

      <input
        type="number"
        step="0.01"
        {...register("unitPrice", { required: true })}
        placeholder="Preço Unitário"
      />

      <input
        type="number"
        step="0.01"
        {...register("salePrice", { required: true })}
        placeholder="Preço de Venda"
      />

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Concluir
      </Button>
    </Box>
  );
};

export const StepPrice = () => {
  const dispatch = useDispatch();

  const conclude = (value: PriceForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "price",
        steps: { price: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        unitPrice: convertToCents(value.unitPrice),
        salePrice: convertToCents(value.salePrice),
      })
    );
  };
  return <StepPriceComponent actions={{ conclude }} />;
};
