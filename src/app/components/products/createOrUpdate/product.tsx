import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import {
  CreateProductPayload,
  CreateProductWithVariantPayload,
  Product,
  RegisterSteps,
} from "../../../../features/products/types";
import { StepIdentification } from "./steps/identification";
import { StepCategory } from "./steps/category";
import { StepVariant } from "./steps/variant";
import { StepPrice } from "./steps/price";
import { StepStock } from "./steps/stock";

interface Props {
  data: {
    product?: Product;
    steps: RegisterSteps;
    registerForm: CreateProductPayload | CreateProductWithVariantPayload | null;
  };
  actions: {
    createProduct?: (
      value: CreateProductWithVariantPayload | CreateProductPayload
    ) => void;
    updateProduct?: (id: string) => void;
    onClose?: () => void;
  };
}

export const CreateOrUpdateProductComponent = ({ data, actions }: Props) => {
  const { product, steps, registerForm } = data;
  const { createProduct, onClose, updateProduct } = actions;
  const { handleSubmit, reset } = useForm<CreateProductWithVariantPayload>();

  const onSubmit = () => {
    if (product?._id && updateProduct) {
      updateProduct(product._id);
    }
    if (createProduct) {
      createProduct(registerForm!);
    }

    reset();
    if (onClose) {
      onClose();
    }
  };

  const currentStep = () => {
    const allSteps = {
      identification: <StepIdentification data={{ product }} />,
      category: <StepCategory data={{ product }} />,
      variant: <StepVariant data={{ product }} />,
      price: <StepPrice data={{ product }} />,
      stock: <StepStock data={{ product }} />,
    };
    return allSteps[steps.status];
  };

  const allStepsCompleted = Object.values(steps.steps).every(
    (step) => step === true
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} p={4}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={700}
          color="primary.main"
          sx={{ mb: 1 }}
        >
          {product?._id ? "Edite o produto" : "Novo Produto"}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Preencha os dados para
          {product?._id ? " editar o produto" : " criar um novo produto"}
        </Typography>
      </Box>

      <Box
        sx={{
          py: 3,
          px: 2,
          borderRadius: 1,
          mb: 3,
        }}
      >
        {currentStep()}
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        {onClose && (
          <Button variant="outlined" onClick={onClose} size="large">
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={!allStepsCompleted}
          size="large"
          sx={{ minWidth: 120 }}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};
