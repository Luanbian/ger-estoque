import { Box, Button, Typography } from "@mui/material";
import {
  AddVariantPayload,
  Product,
  UpdateVariantPayload,
} from "../../../../features/products/types";
import { IconArrowForward, IconPlus } from "@tabler/icons-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "../../../../store/hooks";
import { actions } from "../../../../features/products";
import {
  createEmptyVariant,
  normalizeVariant,
} from "../../../../utils/variants.aux";
import { VariantForm } from "./variantForm";

interface Props {
  actions: {
    createVariant: (data: AddVariantPayload[]) => void;
    updateVariant: (data: UpdateVariantPayload) => void;
  };
  data: {
    variant?: Product;
  };
}

const CreateOrUpdateVariantComponent = ({ actions, data }: Props) => {
  const { createVariant, updateVariant } = actions;
  const { variant } = data;

  const { handleSubmit, control, register } = useForm<{
    variants: AddVariantPayload[];
  }>({
    defaultValues: {
      variants: [
        variant
          ? normalizeVariant({
              ...variant,
              attributes: variant.variantAttributes,
            })
          : createEmptyVariant(),
      ],
    },
  });

  const fieldActions = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: { variants: AddVariantPayload[] }) => {
    if (variant) {
      updateVariant({
        id: variant._id,
        name: data.variants[0].name,
        attributes: data.variants[0].attributes,
        stock: data.variants[0].stock,
        minStock: data.variants[0].minStock,
        unitPrice: data.variants[0].unitPrice,
        salePrice: data.variants[0].salePrice,
      });
      return;
    }
    createVariant(data.variants);
  };

  const addVariantToList = () => {
    fieldActions.append({
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
          {variant
            ? "Atualizar Variante do Produto"
            : "Criar Variantes para o Produto"}
        </Typography>

        {fieldActions.fields.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {fieldActions.fields.map((variant, index) => (
              <VariantForm
                key={variant.id}
                index={index}
                showRemove={fieldActions.fields.length > 1}
                actions={fieldActions}
                register={register}
                control={control}
              />
            ))}
            {!variant && (
              <Button
                variant="outlined"
                fullWidth
                startIcon={<IconPlus />}
                onClick={addVariantToList}
                sx={{ mb: 3 }}
              >
                Adicionar Nova Variante
              </Button>
            )}
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

interface CreateOrUpdateVariantProps {
  data: {
    variant?: Product;
    productId?: string;
  };
}

export const CreateOrUpdateVariant = ({ data }: CreateOrUpdateVariantProps) => {
  const dispatch = useDispatch();
  const { productId, variant } = data;

  const createVariant = (data: AddVariantPayload[]) => {
    if (!productId) return;
    dispatch(actions.addVariantToProductRequest({ id: productId, data }));
  };

  const updateVariant = (data: UpdateVariantPayload) => {
    if (!variant) return;
    dispatch(actions.updateVariantRequest(data));
  };

  return (
    <CreateOrUpdateVariantComponent
      actions={{ createVariant, updateVariant }}
      data={{ variant }}
    />
  );
};
