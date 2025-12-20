import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { actions } from "../../../../../features/products";
import { useDispatch } from "../../../../../store/hooks";

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
  const { handleSubmit } = useForm<VariantForm>();
  const [hasVariants, setHasVariants] = useState<boolean>(false);

  const onSubmit = () => {
    nextStep({ hasVariants });
  };

  return (
    <Box>
      <Typography variant="h2">Variante do Produto</Typography>

      <FormControl>
        <InputLabel>Possui Variantes?</InputLabel>
        <Select
          label="Possui Variantes?"
          value={hasVariants ? "true" : "false"}
          onChange={(e) => {
            setHasVariants(e.target.value === "true");
          }}
        >
          <MenuItem value="true">Sim</MenuItem>
          <MenuItem value="false">Não</MenuItem>
        </Select>
      </FormControl>

      {hasVariants && (
        <>
          <Typography variant="h6">Detalhes da Variante</Typography>
        </>
      )}

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
