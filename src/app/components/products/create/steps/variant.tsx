import { Controller, useForm } from "react-hook-form";
import { actions } from "../../../../../features/products";
import { useDispatch } from "../../../../../store/hooks";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface VariantForm {
  hasVariants: boolean;
}

interface Props {
  actions: {
    nextStep: (value: VariantForm) => void;
  };
}

const StepVariantComponent = ({ actions }: Props) => {
  const { nextStep } = actions;
  const { control, handleSubmit } = useForm<VariantForm>();

  const onSubmit = (data: VariantForm) => {
    nextStep(data);
  };

  return (
    <Box>
      <Typography variant="h2">Variante do Produto</Typography>

      <FormControl>
        <InputLabel>Possui Variantes?</InputLabel>
        <Controller
          name="hasVariants"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Possui Variantes?"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <MenuItem value="true">Sim</MenuItem>
              <MenuItem value="false">Não</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Próximo
      </Button>
    </Box>
  );
};

export const StepVariant = () => {
  const dispatch = useDispatch();

  const nextStep = (value: VariantForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "stock",
        steps: { variant: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        hasVariants: value.hasVariants,
      })
    );
  };

  return <StepVariantComponent actions={{ nextStep }} />;
};
