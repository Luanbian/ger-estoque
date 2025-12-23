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
  CreateCategoryPayload,
} from "../../../../features/categories/types";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { actions as categoryActions } from "../../../../features/categories";

interface Props {
  data: {
    categories: Category[];
  };
  actions: {
    createCategory: (value: CreateCategoryPayload) => void;
    onClose?: () => void;
  };
}

const CreateCategoryComponent = ({ actions, data }: Props) => {
  const { categories } = data;
  const { createCategory, onClose } = actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategoryPayload>();

  const onSubmit = (data: CreateCategoryPayload) => {
    createCategory(data);
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
        Nova Categoria
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para criar uma nova categoria
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("name", {
            required: "O nome da categoria é obrigatório",
            minLength: {
              value: 3,
              message: "O nome deve ter pelo menos 3 caracteres",
            },
          })}
          label="Nome da Categoria"
          placeholder="Digite o nome da categoria"
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          autoFocus
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
        />

        <TextField
          {...register("displayOrder", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "A ordem deve ser um número positivo",
            },
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
        />

        <Typography variant="h6" color="text.primary">
          Sub categoria (opcional)
        </Typography>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Categoria Pai</InputLabel>
          <Select
            label="Categoria Pai"
            {...register("fatherCategoryId", { required: false })}
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
  actions: {
    onClose?: () => void;
  };
}

export const CreateCategory = ({ actions }: CreateCategoryProps) => {
  const dispatch = useDispatch();
  const { dataPlain } = useSelector((state) => state.category);

  const { onClose } = actions;

  const createCategory = (value: CreateCategoryPayload) => {
    if (value.fatherCategoryId) {
      dispatch(categoryActions.createSubCategoryRequest(value));
      return;
    }

    dispatch(categoryActions.createCategoryRequest(value));
  };

  if (!dataPlain) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <CreateCategoryComponent
      actions={{ onClose, createCategory }}
      data={{ categories: dataPlain }}
    />
  );
};
