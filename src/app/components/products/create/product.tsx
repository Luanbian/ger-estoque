import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import {
  CreateProductPayload,
  CreateProductWithVariantPayload,
  RegisterSteps,
} from "../../../../features/products/types";
import { StepIdentification } from "./steps/identification";
import { StepCategory } from "./steps/category";
import { StepVariant } from "./steps/variant";
import { StepPrice } from "./steps/price";
import { StepStock } from "./steps/stock";

interface Props {
  data: {
    steps: RegisterSteps;
    registerForm: CreateProductPayload | CreateProductWithVariantPayload | null;
  };
  actions: {
    createProduct: (
      value: CreateProductWithVariantPayload | CreateProductPayload
    ) => void;
    onClose?: () => void;
  };
}

export const CreateProductComponent = ({ data, actions }: Props) => {
  const { steps, registerForm } = data;
  const { createProduct, onClose } = actions;
  const { handleSubmit, reset } = useForm<CreateProductWithVariantPayload>();

  const onSubmit = () => {
    createProduct(registerForm!);
    reset();
    if (onClose) {
      onClose();
    }
  };

  const currentStep = () => {
    const allSteps = {
      identification: <StepIdentification />,
      category: <StepCategory />,
      variant: <StepVariant />,
      price: <StepPrice />,
      stock: <StepStock />,
    };
    return allSteps[steps.status];
  };

  const allStepsCompleted = Object.values(steps.steps).every(
    (step) => step === true
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: 500,
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Novo Produto
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para criar um novo produto
      </Typography>

      {currentStep()}

      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" disabled={!allStepsCompleted}>
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};
