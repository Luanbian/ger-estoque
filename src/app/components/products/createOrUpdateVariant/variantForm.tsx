import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import {
  Control,
  useFieldArray,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { AddVariantPayload } from "../../../../features/products/types";

interface Props {
  index: number;
  showRemove: boolean;
  actions: UseFieldArrayReturn<
    {
      variants: AddVariantPayload[];
    },
    "variants",
    "id"
  >;
  register: UseFormRegister<{
    variants: AddVariantPayload[];
  }>;
  control: Control<
    {
      variants: AddVariantPayload[];
    },
    any,
    {
      variants: AddVariantPayload[];
    }
  >;
}

export const VariantForm = ({
  index,
  showRemove,
  actions,
  register,
  control,
}: Props) => {
  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: `variants.${index}.attributes`,
  });

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Variante {index + 1}
        </Typography>
        {showRemove && (
          <IconButton
            color="error"
            onClick={() => actions.remove(index)}
            size="small"
          >
            <IconTrash />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            {...register(`variants.${index}.name`, {
              required: "Nome da variante é obrigatório",
            })}
            label="Nome da Variante"
            placeholder="Ex: Tamanho M - Cor Azul"
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register(`variants.${index}.unitPrice`, {
              required: "Preço unitário é obrigatório",
              valueAsNumber: true,
            })}
            label="Preço Unitário"
            type="number"
            placeholder="0.00"
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register(`variants.${index}.salePrice`, {
              required: "Preço de venda é obrigatório",
              valueAsNumber: true,
            })}
            label="Preço de Venda"
            type="number"
            placeholder="0.00"
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register(`variants.${index}.stock`, {
              required: "Estoque é obrigatório",
              valueAsNumber: true,
            })}
            label="Estoque"
            type="number"
            placeholder="0"
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register(`variants.${index}.minStock`, {
              required: "Estoque mínimo é obrigatório",
              valueAsNumber: true,
            })}
            label="Estoque Mínimo"
            type="number"
            placeholder="0"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            Atributos da Variante
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconPlus />}
            onClick={() => appendAttribute({ type: "", value: "" })}
          >
            Adicionar Atributo
          </Button>
        </Box>

        {attributeFields.map((attr, attrIndex) => (
          <Box
            key={attr.id}
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
              alignItems: "flex-start",
            }}
          >
            <TextField
              {...register(`variants.${index}.attributes.${attrIndex}.type`, {
                required: "Tipo é obrigatório",
              })}
              label="Tipo"
              placeholder="Ex: Cor, Tamanho"
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              {...register(`variants.${index}.attributes.${attrIndex}.value`, {
                required: "Valor é obrigatório",
              })}
              label="Valor"
              placeholder="Ex: Azul, M"
              fullWidth
              variant="outlined"
              size="small"
            />
            {attributeFields.length > 1 && (
              <IconButton
                color="error"
                onClick={() => removeAttribute(attrIndex)}
                size="small"
              >
                <IconTrash />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
