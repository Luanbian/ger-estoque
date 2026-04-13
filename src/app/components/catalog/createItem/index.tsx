import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconPackage, IconX } from "@tabler/icons-react";
import {
  CatalogCategory,
  CatalogItemPayload,
} from "../../../../features/catalog/types";
import { useDispatch } from "../../../../store/hooks";
import { actions as catalogActions } from "../../../../features/catalog";

interface CreateCatalogItemProps {
  showcaseId: string;
  categories: CatalogCategory[];
  actions: {
    onClose?: () => void;
  };
}

interface FormData {
  title: string;
  description?: string;
  categoryId?: string;
  basePriceInReais?: number;
}

export const CreateCatalogItem = ({
  showcaseId,
  categories,
  actions: { onClose },
}: CreateCatalogItemProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const payload: CatalogItemPayload = {
      showcaseId,
      title: data.title,
      ...(data.description ? { description: data.description } : {}),
      ...(data.categoryId ? { categoryId: data.categoryId } : {}),
      ...(data.basePriceInReais && data.basePriceInReais > 0
        ? { pricing: { basePriceInCents: Math.round(data.basePriceInReais * 100) } }
        : {}),
    };
    dispatch(catalogActions.createCatalogItemRequest(payload));
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
          <IconPackage size={20} />
        </Box>
        <Typography variant="h5" fontWeight={600}>
          Novo Item de Catálogo
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, pl: 7 }}>
        Adicione um item ao seu catálogo de produtos
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("title", {
            required: "O título do item é obrigatório",
            minLength: {
              value: 2,
              message: "O título deve ter pelo menos 2 caracteres",
            },
          })}
          label="Título"
          placeholder="Ex: Camiseta Básica, Notebook Dell..."
          fullWidth
          required
          autoFocus
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          {...register("description")}
          label="Descrição"
          placeholder="Descreva o item..."
          fullWidth
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Categoria">
                <MenuItem value="">Sem categoria</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <TextField
          {...register("basePriceInReais", {
            min: { value: 0, message: "O preço não pode ser negativo" },
            valueAsNumber: true,
          })}
          label="Preço base"
          placeholder="0,00"
          type="number"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            },
            htmlInput: { step: "0.01", min: "0" },
          }}
          error={!!errors.basePriceInReais}
          helperText={errors.basePriceInReais?.message}
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
            Salvar Item
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
