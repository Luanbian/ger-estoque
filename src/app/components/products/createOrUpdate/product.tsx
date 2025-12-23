import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import {
  ProductPayload,
  CreateProductWithVariantPayload,
  Product,
  RegisterSteps,
} from "../../../../features/products/types";
import { StepIdentification } from "./steps/identification";
import { StepCategory } from "./steps/category";
import { StepVariant } from "./steps/variant";
import { StepPrice } from "./steps/price";
import { StepStock } from "./steps/stock";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { actions as productActions } from "../../../../features/products";

interface Props {
  data: {
    product?: Product;
    steps: RegisterSteps;
    registerForm: ProductPayload | CreateProductWithVariantPayload | null;
  };
  actions: {
    createProduct: (
      value: CreateProductWithVariantPayload | ProductPayload
    ) => void;
    updateProduct: (id: string, productToUpdate: ProductPayload) => void;
    cancel?: () => void;
  };
}

const CreateOrUpdateProductComponent = ({ data, actions }: Props) => {
  const { product, steps, registerForm } = data;
  const { createProduct, cancel, updateProduct } = actions;
  const { handleSubmit, reset } = useForm<CreateProductWithVariantPayload>();

  const onSubmit = () => {
    if (product?._id) {
      updateProduct(product._id, {
        name: registerForm!.name,
        type: registerForm!.type,
        categoryId: registerForm!.categoryId,
        unitOfMeasureId: registerForm!.unitOfMeasureId,
        hasVariants: registerForm!.hasVariants,
        stock: "stock" in registerForm! ? registerForm!.stock : undefined,
        minStock:
          "minStock" in registerForm! ? registerForm!.minStock : undefined,
        salePrice:
          "salePrice" in registerForm! ? registerForm!.salePrice : undefined,
        unitPrice:
          "unitPrice" in registerForm! ? registerForm!.unitPrice : undefined,
      });
    } else {
      createProduct(registerForm!);
    }
    reset();
    cancel?.();
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
        {cancel && (
          <Button variant="outlined" onClick={cancel} size="large">
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

export interface CreateOrUpdateProductProps {
  data?: {
    product?: Product;
  };
  actions: {
    cancel?: () => void;
  };
}

export const CreateOrUpdateProduct = ({
  actions,
  data,
}: CreateOrUpdateProductProps) => {
  const dispatch = useDispatch();
  const { product } = data || {};
  const { registerSteps, registerForm } = useSelector((state) => state.product);

  const { cancel } = actions;

  const createProduct = (
    value: CreateProductWithVariantPayload | ProductPayload
  ) => {
    if (value.hasVariants && "variants" in value && value.variants.length > 0) {
      dispatch(
        productActions.createProductWithVariantRequest(
          value as CreateProductWithVariantPayload
        )
      );
      return;
    }

    dispatch(productActions.createProductRequest(value as ProductPayload));
  };

  const updateProduct = (id: string, productToUpdate: ProductPayload) => {
    dispatch(
      productActions.updateProductRequest({ id, data: productToUpdate })
    );
  };

  return (
    <CreateOrUpdateProductComponent
      actions={{ createProduct, updateProduct, cancel }}
      data={{ steps: registerSteps, registerForm, product }}
    />
  );
};
