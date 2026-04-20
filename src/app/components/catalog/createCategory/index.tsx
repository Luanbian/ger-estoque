import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
  Divider,
  IconButton,
} from "@mui/material";
import {
  IconDeviceFloppy,
  IconTag,
  IconX,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  CatalogCategoryAssociate,
  CatalogCategoryPayload,
} from "../../../../features/catalog/types";

interface CreateCatalogCategoryProps {
  actions: {
    onClose?: () => void;
    createCatalogCategory: (data: CatalogCategoryPayload) => void;
    associateCatalogCategory: (data: CatalogCategoryAssociate) => void;
  };
}

export const CreateCatalogCategory = ({
  actions,
}: CreateCatalogCategoryProps) => {
  const { onClose, createCatalogCategory, associateCatalogCategory } = actions;
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CatalogCategoryPayload>();

  const addSubCategory = () => setSubCategories((prev) => [...prev, ""]);

  const removeSubCategory = (index: number) =>
    setSubCategories((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = (data: CatalogCategoryPayload) => {
    createCatalogCategory(data);
    reset();
    onClose?.();
  };

  const handleCancel = () => {
    reset();
    onClose?.();
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

        <Box>
          <Divider sx={{ mb: 2 }} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1.5}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Criar Sub categorias
            </Typography>
            <IconButton size="small" color="primary" onClick={addSubCategory}>
              <IconPlus size={18} />
            </IconButton>
          </Stack>

          {subCategories.length === 0 && (
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ fontStyle: "italic" }}
            >
              Clique no + para adicionar subcategorias
            </Typography>
          )}

          <Stack spacing={1.5}>
            {subCategories.map((_, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <TextField
                  {...register(`subCategory.${index}`)}
                  label={`Subcategoria ${index + 1}`}
                  placeholder="Nome da subcategoria..."
                  fullWidth
                  size="small"
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeSubCategory(index)}
                >
                  <IconTrash size={16} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Box>

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
