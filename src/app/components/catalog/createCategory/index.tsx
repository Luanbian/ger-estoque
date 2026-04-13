import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { IconDeviceFloppy, IconTag, IconX } from "@tabler/icons-react";
import { CatalogCategoryPayload } from "../../../../features/catalog/types";
import { useDispatch } from "../../../../store/hooks";
import { actions as catalogActions } from "../../../../features/catalog";

interface CreateCatalogCategoryProps {
  actions: {
    onClose?: () => void;
  };
}

export const CreateCatalogCategory = ({
  actions,
}: CreateCatalogCategoryProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CatalogCategoryPayload>();

  const onSubmit = (data: CatalogCategoryPayload) => {
    dispatch(catalogActions.createCatalogCategoryRequest(data));
    reset();
    actions.onClose?.();
  };

  const handleCancel = () => {
    reset();
    actions.onClose?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", maxWidth: 500, p: 3 }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.light",
            color: "primary.main",
            flexShrink: 0,
          }}
        >
          <IconTag size={20} />
        </Box>
        <Typography variant="h5" fontWeight={600}>
          Nova Categoria de Catálogo
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, pl: 7 }}>
        Crie uma categoria para organizar os itens do seu catálogo
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("name", {
            required: "O nome da categoria é obrigatório",
            minLength: {
              value: 2,
              message: "O nome deve ter pelo menos 2 caracteres",
            },
          })}
          label="Nome da Categoria"
          placeholder="Ex: Eletrônicos, Vestuário, Alimentos..."
          fullWidth
          required
          autoFocus
          error={!!errors.name}
          helperText={errors.name?.message}
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
