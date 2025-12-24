import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import {
  Category,
  CategoryPayload,
} from "../../../../features/categories/types";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { actions as categoryActions } from "../../../../features/categories";

interface Props {
  data: {
    category?: Category | null;
    fatherCategoryId?: string;
    categories: Category[] | null;
  };
  actions: {
    createSubCategory: (value: CategoryPayload) => void;
    updateSubCategory: (id: string, data: CategoryPayload) => void;
    onClose?: () => void;
  };
}

const CreateOrUpdateSubComponent = ({ actions, data }: Props) => {
  const { category, fatherCategoryId, categories } = data;
  const { createSubCategory, updateSubCategory, onClose } = actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryPayload>();

  const onSubmit = (data: CategoryPayload) => {
    if (category?._id) {
      updateSubCategory(category._id, data);
    } else {
      createSubCategory(data);
    }

    reset();
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    reset();
    if (onClose) {
      onClose();
    }
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
        {category?._id ? "Editar" : "Criar"} Sub categoria
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para {category?._id ? "editar essa" : "criar uma"} sub
        categoria
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("name", {
            required: "O nome da categoria é obrigatório",
          })}
          label="Nome da Categoria"
          placeholder="Digite o nome da categoria"
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          defaultValue={category?.name || ""}
        />

        <TextField
          {...register("description")}
          label="Descrição"
          placeholder="Digite uma descrição (opcional)"
          fullWidth
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
          defaultValue={category?.description || ""}
        />

        <TextField
          {...register("displayOrder", {
            valueAsNumber: true,
          })}
          label="Ordem de Exibição"
          placeholder="0"
          type="number"
          fullWidth
          error={!!errors.displayOrder}
          helperText={
            errors.displayOrder?.message ||
            "Defina a ordem de exibição da categoria"
          }
          defaultValue={category?.displayOrder || 0}
        />

        <Typography variant="h6" color="text.primary">
          Sub categoria
        </Typography>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Categoria Pai</InputLabel>
          <Select
            label="Categoria Pai"
            {...register("fatherCategoryId", { required: false })}
            value={fatherCategoryId || category?.fatherCategoryId || ""}
            disabled
          >
            <MenuItem
              value={fatherCategoryId || category?.fatherCategoryId || ""}
            >
              {categories?.find(
                (cat) =>
                  cat._id ===
                  (fatherCategoryId || category?.fatherCategoryId || "")
              )?.name || ""}
            </MenuItem>
          </Select>
        </FormControl>

        {Object.keys(errors).length > 0 && (
          <Alert severity="error">
            Por favor, corrija os erros antes de continuar
          </Alert>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<IconX size={18} />}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<IconDeviceFloppy size={18} />}
          >
            Salvar Sub Categoria
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

interface CreateOrUpdateSubProps {
  data?: {
    category?: Category | null;
    fatherCategoryId?: string;
  };
  actions: {
    onClose?: () => void;
  };
}

export const CreateOrUpdateSub = ({
  actions,
  data,
}: CreateOrUpdateSubProps) => {
  const dispatch = useDispatch();
  const { dataPlain } = useSelector((state) => state.category);

  const { onClose } = actions;
  const { category, fatherCategoryId } = data || {};

  const createSubCategory = (value: CategoryPayload) => {
    dispatch(categoryActions.createSubCategoryRequest(value));
  };

  const updateSubCategory = (id: string, data: CategoryPayload) => {
    dispatch(
      categoryActions.updateCategoryRequest({
        id,
        data: { ...data, fatherCategoryId: data?.fatherCategoryId || null },
      })
    );
  };

  return (
    <CreateOrUpdateSubComponent
      actions={{
        onClose,
        createSubCategory,
        updateSubCategory,
      }}
      data={{ category, fatherCategoryId, categories: dataPlain }}
    />
  );
};
