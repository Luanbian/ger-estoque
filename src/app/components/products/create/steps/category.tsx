import { useEffect } from "react";
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
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { ProductType } from "../../../../../features/common/productTypeEnum";
import { actions } from "../../../../../features/products";
import { actions as categoryActions } from "../../../../../features/categories";
import { actions as unitOfMeasureActions } from "../../../../../features/unitOfMeasure";
import { Category } from "../../../../../features/categories/types";
import { unitOfMeasure } from "../../../../../features/unitOfMeasure/types";

interface Props {
  data: {
    categories: Category[];
    unitOfMeasures: unitOfMeasure[];
  };
  actions: {
    nextStep: (value: CategoryForm) => void;
  };
}

interface CategoryForm {
  type: ProductType;
  categoryId: string;
  unitOfMeasureId: string;
}

const StepCategoryComponent = ({ actions, data }: Props) => {
  const { categories, unitOfMeasures } = data;
  const { nextStep } = actions;
  const { register, handleSubmit } = useForm<CategoryForm>();

  const onSubmit = (data: CategoryForm) => {
    nextStep(data);
  };

  return (
    <Box>
      <Typography variant="h2">Categoria do Produto</Typography>

      <Box display={"flex"} gap={2} m={2}>
        <FormControl fullWidth>
          <InputLabel>Tipo de Produto</InputLabel>
          <Select
            label="Tipo de Produto"
            {...register("type", { required: true })}
          >
            <MenuItem value={ProductType.FINAL}>Final</MenuItem>
            <MenuItem value={ProductType.RAW_MATERIAL}>Matéria-prima</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Categoria do produto</InputLabel>
          <Select
            label="Categoria do produto"
            {...register("categoryId", { required: true })}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Unidade de medida do produto</InputLabel>
          <Select
            label="Unidade de medida do produto"
            {...register("unitOfMeasureId", { required: true })}
          >
            {unitOfMeasures.map((unit) => (
              <MenuItem key={unit._id} value={unit._id}>
                {unit.name} - {unit.abbreviation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Próximo
      </Button>
    </Box>
  );
};

export const StepCategory = () => {
  const dispatch = useDispatch();
  const { dataPlain } = useSelector((state) => state.category);
  const { data } = useSelector((state) => state.unitOfMeasure);
  const { registerForm, registerSteps } = useSelector((state) => state.product);

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
        hasVariants: false,
      })
    );
  };

  useEffect(() => {
    dispatch(categoryActions.categoryRequest());
    dispatch(unitOfMeasureActions.unitOfMeasureRequest());
  }, []);

  return (
    <StepCategoryComponent
      actions={{ nextStep }}
      data={{ categories: dataPlain || [], unitOfMeasures: data || [] }}
    />
  );
};
