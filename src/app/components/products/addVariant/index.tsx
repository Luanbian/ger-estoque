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
import { AddVariantPayload } from "../../../../features/products/types";
import { IconArrowForward, IconPlus, IconTrash } from "@tabler/icons-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "../../../../store/hooks";
import { actions } from "../../../../features/products";

interface Props {
  actions: {
    addVariant: (data: AddVariantPayload[]) => void;
  };
}

const AddVariantComponent = ({ actions }: Props) => {
  const { addVariant } = actions;
  const { handleSubmit, register, control } = useForm<{
    variants: AddVariantPayload[];
  }>({
    defaultValues: {
      variants: [
        {
          name: "",
          attributes: [{ type: "", value: "" }],
          stock: 0,
          minStock: 0,
          unitPrice: 0,
          salePrice: 0,
        },
      ],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: { variants: AddVariantPayload[] }) => {
    addVariant(data.variants);
  };

  const addVariantToList = () => {
    appendVariant({
      name: "",
      attributes: [{ type: "", value: "" }],
      stock: 0,
      minStock: 0,
      unitPrice: 0,
      salePrice: 0,
    });
  };

  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        borderRadius: 1,
        mb: 3,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          fontWeight={600}
          color="text.primary"
          sx={{ mb: 1 }}
        >
          Adicionar variante ao produto
        </Typography>

        {variantFields.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {variantFields.map((variant, index) => (
              <VariantForm
                key={variant.id}
                index={index}
                variant={variant}
                register={register}
                control={control}
                removeVariant={removeVariant}
                showRemove={variantFields.length > 1}
              />
            ))}

            <Button
              variant="outlined"
              fullWidth
              startIcon={<IconPlus />}
              onClick={addVariantToList}
              sx={{ mb: 3 }}
            >
              Adicionar Nova Variante
            </Button>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<IconArrowForward />}
          onClick={handleSubmit(onSubmit)}
          sx={{ minWidth: 120 }}
        >
          Concluir
        </Button>
      </Box>
    </Box>
  );
};

const VariantForm = ({
  index,
  register,
  control,
  removeVariant,
  showRemove,
}: any) => {
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
            onClick={() => removeVariant(index)}
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
interface AddVariantProps {
  data: {
    productId?: string;
  };
}

export const AddVariant = ({ data }: AddVariantProps) => {
  const dispatch = useDispatch();
  const { productId } = data;

  const addVariant = (data: AddVariantPayload[]) => {
    if (!productId) return;
    dispatch(actions.addVariantToProductRequest({ id: productId, data }));
  };

  if (!productId) {
    return null;
  }

  return <AddVariantComponent actions={{ addVariant }} />;
};
