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
import { CreateProductPayload } from "../../../../features/products/types";

interface Props {
  actions: {
    createProduct: (value: CreateProductPayload) => void;
    onClose?: () => void;
  };
}

export const CreateProductComponent = ({ actions }: Props) => {
  const { createProduct, onClose } = actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductPayload>();

  const onSubmit = (data: CreateProductPayload) => {
    createProduct(data);
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
        Novo Produto
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para criar um novo produto
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("name", {
            required: "O nome do produto é obrigatório",
            minLength: {
              value: 3,
              message: "O nome deve ter pelo menos 3 caracteres",
            },
          })}
          label="Nome do Produto"
          placeholder="Digite o nome do produto"
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          autoFocus
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
            Salvar Produto
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
