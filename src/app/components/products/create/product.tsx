import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import {
  CreateProductPayload,
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
    registerForm: Partial<CreateProductPayload> | null;
  };
  actions: {
    createProduct: (value: CreateProductPayload) => void;
    onClose?: () => void;
  };
}

export const CreateProductComponent = ({ data, actions }: Props) => {
  const { steps, registerForm } = data;
  const { createProduct, onClose } = actions;
  const { handleSubmit, reset } = useForm<CreateProductPayload>();

  const onSubmit = () => {
    createProduct(registerForm as CreateProductPayload);
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
        <Button
          type="submit"
          variant="contained"
          disabled={!(steps.status === "price" && steps.steps?.price === true)}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};
