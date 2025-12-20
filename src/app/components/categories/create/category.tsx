import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { CreateCategoryPayload } from "../../../../features/categories/types";

interface Props {
  actions: {
    createCategory: (value: CreateCategoryPayload) => void;
  };
  onClose?: () => void;
}

export const CreateCategoryComponent = ({ actions, onClose }: Props) => {
  const { createCategory } = actions;
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
