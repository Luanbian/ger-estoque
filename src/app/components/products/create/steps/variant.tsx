import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { actions } from "../../../../../features/products";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { VariantAttributes } from "../../../../../features/products/types";
import {
  IconArrowBack,
  IconArrowForward,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  createEmptyVariant,
  normalizeVariant,
} from "../../../../../utils/variants.aux";

export interface VariantForm {
  hasVariants: boolean;
  variants: {
    name: string;
    attributes: VariantAttributes[];
    stock: number;
    minStock: number;
    unitPrice: number;
    salePrice: number;
  }[];
}

interface Props {
  actions: {
    nextStep: (value: VariantForm) => void;
    prevStep: () => void;
  };
  data: {
    hasVariants?: boolean;
    variants?: {
      name?: string;
      attributes?: VariantAttributes[];
      stock?: number;
      minStock?: number;
      unitPrice?: number;
      salePrice?: number;
    }[];
  };
}

const StepVariantComponent = ({ actions, data }: Props) => {
  const { nextStep, prevStep } = actions;
  const { hasVariants: initialHasVariants, variants: initialVariants } = data;
  const { handleSubmit, register } = useForm<VariantForm>();
  const [hasVariants, setHasVariants] = useState<boolean>(
    initialHasVariants || false
  );
  const [variants, setVariants] = useState<VariantForm["variants"]>(() =>
    initialVariants?.length
      ? initialVariants.map(normalizeVariant)
      : [createEmptyVariant()]
  );

  const onSubmit = (data: VariantForm) => {
    nextStep({ hasVariants, variants: data.variants });
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        name: "",
        attributes: [{ type: "", value: "" }],
        stock: 0,
        minStock: 0,
        unitPrice: 0,
        salePrice: 0,
      },
    ]);
  };

  const addAttribute = (variantIndex: number) => {
    setVariants((prev) => {
      const newVariants = [...prev];
      const currentAttributes = newVariants[variantIndex].attributes;
      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        attributes: [...currentAttributes, { type: "", value: "" }],
      };
      return newVariants;
    });
  };

  const removeAttribute = (variantIndex: number, attrIndex: number) => {
    setVariants((prev) => {
      const newVariants = [...prev];
      newVariants[variantIndex].attributes = newVariants[
        variantIndex
      ].attributes.filter((_, i) => i !== attrIndex);
      return newVariants;
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        sx={{ mb: 1 }}
      >
        Variantes do Produto
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure se o produto possui variantes como tamanho, cor, etc.
      </Typography>

      <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
        <InputLabel>Possui Variantes?</InputLabel>
        <Select
          label="Possui Variantes?"
          value={hasVariants ? "true" : "false"}
          onChange={(e) => setHasVariants(e.target.value === "true")}
        >
          <MenuItem value="false">Não</MenuItem>
          <MenuItem value="true">Sim</MenuItem>
        </Select>
      </FormControl>

      {hasVariants && variants.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {variants.map((variant, index) => (
            <Paper
              key={index}
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
                {variants.length > 1 && (
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
                    defaultValue={variant.name}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register(`variants.${index}.unitPrice`, {
                      required: "Preço unitário é obrigatório",
                      min: { value: 0, message: "Preço deve ser maior que 0" },
                    })}
                    label="Preço Unitário"
                    type="number"
                    placeholder="0.00"
                    fullWidth
                    variant="outlined"
                    defaultValue={variant.unitPrice}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register(`variants.${index}.salePrice`, {
                      required: "Preço de venda é obrigatório",
                      min: { value: 0, message: "Preço deve ser maior que 0" },
                    })}
                    label="Preço de Venda"
                    type="number"
                    placeholder="0.00"
                    fullWidth
                    variant="outlined"
                    defaultValue={variant.salePrice}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register(`variants.${index}.stock`, {
                      required: "Estoque é obrigatório",
                      min: {
                        value: 0,
                        message: "Estoque não pode ser negativo",
                      },
                    })}
                    label="Estoque"
                    type="number"
                    placeholder="0"
                    fullWidth
                    variant="outlined"
                    defaultValue={variant.stock}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register(`variants.${index}.minStock`, {
                      required: "Estoque mínimo é obrigatório",
                      min: {
                        value: 0,
                        message: "Estoque mínimo não pode ser negativo",
                      },
                    })}
                    label="Estoque Mínimo"
                    type="number"
                    placeholder="0"
                    fullWidth
                    variant="outlined"
                    defaultValue={variant.minStock}
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
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Atributos da Variante
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<IconPlus />}
                    onClick={() => addAttribute(index)}
                  >
                    Adicionar Atributo
                  </Button>
                </Box>

                {variant.attributes.map((_, attrIndex) => (
                  <Box
                    key={attrIndex}
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <TextField
                      {...register(
                        `variants.${index}.attributes.${attrIndex}.type`,
                        {
                          required: "Tipo é obrigatório",
                        }
                      )}
                      label="Tipo"
                      placeholder="Ex: Cor, Tamanho"
                      fullWidth
                      variant="outlined"
                      size="small"
                      defaultValue={variant.attributes[attrIndex].type}
                    />
                    <TextField
                      {...register(
                        `variants.${index}.attributes.${attrIndex}.value`,
                        {
                          required: "Valor é obrigatório",
                        }
                      )}
                      label="Valor"
                      placeholder="Ex: Azul, M"
                      fullWidth
                      variant="outlined"
                      size="small"
                      defaultValue={variant.attributes[attrIndex].value}
                    />
                    {variant.attributes.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => removeAttribute(index, attrIndex)}
                        size="small"
                      >
                        <IconTrash />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}

          <Button
            variant="outlined"
            fullWidth
            startIcon={<IconPlus />}
            onClick={addVariant}
            sx={{ mb: 3 }}
          >
            Adicionar Nova Variante
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<IconArrowBack />}
          sx={{ minWidth: 120 }}
          onClick={prevStep}
        >
          Voltar
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<IconArrowForward />}
          onClick={handleSubmit(onSubmit)}
          sx={{ minWidth: 120 }}
        >
          Próximo
        </Button>
      </Box>
    </Box>
  );
};

export const StepVariant = () => {
  const dispatch = useDispatch();
  const { registerForm, registerSteps } = useSelector((state) => state.product);

  const prevStep = () => {
    dispatch(
      actions.setRegisterSteps({
        status: "category",
        steps: { ...registerSteps.steps, variant: false },
      })
    );
  };

  const nextStep = (value: VariantForm) => {
    dispatch(
      actions.setRegisterSteps({
        status:
          value.hasVariants && value.variants.length > 0 ? "variant" : "stock",
        steps:
          value.hasVariants && value.variants.length > 0
            ? {
                ...registerSteps.steps,
                variant: true,
                price: true,
                stock: true,
              }
            : { ...registerSteps.steps, variant: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        ...registerForm!,
        hasVariants: value.hasVariants,
        variants: value.variants,
      })
    );
  };

  return (
    <StepVariantComponent
      actions={{ nextStep, prevStep }}
      data={{
        hasVariants: registerForm?.hasVariants,
        variants:
          registerForm && "variants" in registerForm
            ? registerForm.variants
            : [],
      }}
    />
  );
};
