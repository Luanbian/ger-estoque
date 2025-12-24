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
    categories: Category[];
    category?: Category;
    fatherCategoryId?: string;
  };
  actions: {
    createCategory: (value: CategoryPayload) => void;
    updateCategory: (id: string, data: CategoryPayload) => void;
    onClose?: () => void;
  };
}

const CreateOrUpdateCategoryComponent = ({ actions, data }: Props) => {
  const { categories, category, fatherCategoryId } = data;
  const { createCategory, updateCategory, onClose } = actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryPayload>();

  const onSubmit = (data: CategoryPayload) => {
    if (category?._id) {
      updateCategory(category._id, data);
    } else {
      createCategory(data);
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
        {category?._id ? "Editar Categoria" : "Nova Categoria"}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para {category?._id ? "editar" : "criar"} uma
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
          Sub categoria (opcional)
        </Typography>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Categoria Pai</InputLabel>
          <Select
            label="Categoria Pai"
            {...register("fatherCategoryId", { required: false })}
            defaultValue={fatherCategoryId || category?.fatherCategoryId || ""}
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
            Salvar Categoria
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

interface CreateCategoryProps {
  data?: {
    category?: Category;
    fatherCategoryId?: string;
  };
  actions: {
    onClose?: () => void;
  };
}

export const CreateOrUpdateCategory = ({
  actions,
  data,
}: CreateCategoryProps) => {
  const dispatch = useDispatch();
  const { dataPlain } = useSelector((state) => state.category);

  const { onClose } = actions;
  const { category, fatherCategoryId } = data || {};

  const createCategory = (value: CategoryPayload) => {
    if (value.fatherCategoryId) {
      dispatch(categoryActions.createSubCategoryRequest(value));
      return;
    }

    dispatch(categoryActions.createCategoryRequest(value));
  };

  const updateCategory = (id: string, data: CategoryPayload) => {
    dispatch(
      categoryActions.updateCategoryRequest({
        id,
        data: { ...data, fatherCategoryId: data?.fatherCategoryId || null },
      })
    );
  };

  if (!dataPlain) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <CreateOrUpdateCategoryComponent
      actions={{ onClose, createCategory, updateCategory }}
      data={{ categories: dataPlain, category, fatherCategoryId }}
    />
  );
};
