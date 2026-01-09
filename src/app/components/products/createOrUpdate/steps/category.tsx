import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { ProductType } from "../../../../../features/common/productTypeEnum";
import { actions } from "../../../../../features/products";
import { Category } from "../../../../../features/categories/types";
import { UnitOfMeasure } from "../../../../../features/unitOfMeasure/types";
import { IconArrowBack, IconArrowForward } from "@tabler/icons-react";
import { Product } from "../../../../../features/products/types";

interface Props {
  data: {
    categories: Category[];
    unitOfMeasures: UnitOfMeasure[];
    type?: ProductType;
    categoryId?: string;
    unitOfMeasureId?: string;
    product?: Product;
  };
  actions: {
    nextStep: (value: CategoryForm) => void;
    prevStep: () => void;
  };
}

interface CategoryForm {
  type: ProductType;
  categoryId: string;
  unitOfMeasureId: string;
}

const StepCategoryComponent = ({ actions, data }: Props) => {
  const {
    categories,
    unitOfMeasures,
    categoryId,
    unitOfMeasureId,
    type,
    product,
  } = data;
  const { nextStep, prevStep } = actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>();

  const onSubmit = (data: CategoryForm) => {
    nextStep(data);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        sx={{ mb: 1 }}
      >
        Categoria do Produto
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Selecione o tipo, categoria e unidade de medida do produto
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
        <FormControl fullWidth error={!!errors.type} variant="outlined">
          <InputLabel>Tipo de Produto</InputLabel>
          <Select
            label="Tipo de Produto"
            {...register("type", { required: "Selecione o tipo do produto" })}
            defaultValue={product?.type || type || ""}
          >
            <MenuItem value={ProductType.FINAL}>Produto Final</MenuItem>
            <MenuItem value={ProductType.RAW_MATERIAL}>Matéria-prima</MenuItem>
          </Select>
          {errors.type && (
            <FormHelperText>{errors.type.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={!!errors.categoryId} variant="outlined">
          <InputLabel>Categoria do Produto</InputLabel>
          <Select
            label="Categoria do Produto"
            {...register("categoryId", { required: "Selecione uma categoria" })}
            defaultValue={product?.categoryId || categoryId || ""}
          >
            {categories.length === 0 ? (
              <MenuItem disabled>Nenhuma categoria disponível</MenuItem>
            ) : (
              categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))
            )}
          </Select>
          {errors.categoryId && (
            <FormHelperText>{errors.categoryId.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={!!errors.unitOfMeasureId}
          variant="outlined"
        >
          <InputLabel>Unidade de Medida</InputLabel>
          <Select
            label="Unidade de Medida"
            {...register("unitOfMeasureId", {
              required: "Selecione uma unidade de medida",
            })}
            defaultValue={product?.unitOfMeasureId || unitOfMeasureId || ""}
          >
            {unitOfMeasures.length === 0 ? (
              <MenuItem disabled>Nenhuma unidade disponível</MenuItem>
            ) : (
              unitOfMeasures.map((unit) => (
                <MenuItem key={unit._id} value={unit._id}>
                  {unit.name} ({unit.abbreviation})
                </MenuItem>
              ))
            )}
          </Select>
          {errors.unitOfMeasureId && (
            <FormHelperText>{errors.unitOfMeasureId.message}</FormHelperText>
          )}
        </FormControl>
      </Box>

      {(categories.length === 0 || unitOfMeasures.length === 0) && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Certifique-se de cadastrar categorias e unidades de medida antes de
          criar um produto.
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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
          disabled={categories.length === 0 || unitOfMeasures.length === 0}
        >
          Próximo
        </Button>
      </Box>
    </Box>
  );
};

interface StepCategoryProps {
  data: {
    product?: Product;
  };
}

export const StepCategory = ({ data }: StepCategoryProps) => {
  const { product } = data;
  const dispatch = useDispatch();
  const { dataPlain } = useSelector((state) => state.category);
  const { data: unitOfMeasures } = useSelector((state) => state.unitOfMeasure);
  const { registerForm, registerSteps } = useSelector((state) => state.product);

  const prevStep = () => {
    dispatch(
      actions.setRegisterSteps({
        status: "identification",
        steps: { ...registerSteps.steps, category: false },
      })
    );
  };

  const nextStep = (value: CategoryForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "variant",
        steps: { ...registerSteps.steps, category: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        ...registerForm!,
        type: value.type,
        categoryId: value.categoryId,
        unitOfMeasureId: value.unitOfMeasureId,
      })
    );
  };

  return (
    <StepCategoryComponent
      actions={{ nextStep, prevStep }}
      data={{
        categories: dataPlain || [],
        unitOfMeasures: unitOfMeasures || [],
        categoryId: registerForm?.categoryId,
        unitOfMeasureId: registerForm?.unitOfMeasureId,
        type: registerForm?.type,
        product,
      }}
    />
  );
};
