import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { actions } from "../../../../../features/products";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { VariantAttributes } from "../../../../../features/products/types";

interface VariantForm {
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
  };
}

const StepVariantComponent = ({ actions }: Props) => {
  const { nextStep } = actions;
  const { handleSubmit, register } = useForm<VariantForm>();
  const [hasVariants, setHasVariants] = useState<boolean>(false);
  const [variants, setVariants] = useState<VariantForm["variants"]>([
    {
      name: "",
      attributes: [{ type: "", value: "" }],
      stock: 0,
      minStock: 0,
      unitPrice: 0,
      salePrice: 0,
    },
  ]);

  const onSubmit = (data: VariantForm) => {
    nextStep({ hasVariants, variants: data.variants });
  };

  return (
    <Box>
      <Typography variant="h2">Variante do Produto</Typography>

      <FormControl>
        <InputLabel>Possui Variantes?</InputLabel>
        <Select
          label="Possui Variantes?"
          value={hasVariants ? "true" : "false"}
          onChange={(e) => {
            setHasVariants(e.target.value === "true");
          }}
        >
          <MenuItem value="true">Sim</MenuItem>
          <MenuItem value="false">Não</MenuItem>
        </Select>
      </FormControl>

      {hasVariants &&
        variants.length > 0 &&
        variants.map((_, index) => (
          <Box key={index}>
            <Typography variant="h6">Detalhes da Variante</Typography>
            <input
              {...register(`variants.${index}.name`, { required: true })}
              placeholder="Nome da Variante"
            />
            <input
              type="number"
              {...register(`variants.${index}.unitPrice`, { required: true })}
              placeholder="Preço Unitário"
            />
            <input
              type="number"
              {...register(`variants.${index}.salePrice`, { required: true })}
              placeholder="Preço de Venda"
            />
            <input
              type="number"
              {...register(`variants.${index}.stock`, { required: true })}
              placeholder="Estoque"
            />
            <input
              type="number"
              {...register(`variants.${index}.minStock`, { required: true })}
              placeholder="Estoque Mínimo"
            />
            <Typography variant="subtitle1">Atributos da Variante</Typography>
            <Button
              onClick={() => {
                setVariants((prev) => {
                  const newVariants = [...prev];
                  const currentAttributes = newVariants[index].attributes;
                  newVariants[index] = {
                    ...newVariants[index],
                    attributes: [...currentAttributes, { type: "", value: "" }],
                  };
                  return newVariants;
                });
              }}
            >
              Adicionar Atributo
            </Button>
            {variants[index].attributes.map((_, attrIndex) => (
              <Box key={attrIndex}>
                <input
                  {...register(
                    `variants.${index}.attributes.${attrIndex}.type`,
                    {
                      required: true,
                    }
                  )}
                  placeholder="Tipo"
                />
                <input
                  {...register(
                    `variants.${index}.attributes.${attrIndex}.value`,
                    {
                      required: true,
                    }
                  )}
                  placeholder="Valor"
                />
              </Box>
            ))}
          </Box>
        ))}

      {hasVariants && (
        <Button
          onClick={() => {
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
          }}
        >
          Adicionar Variante
        </Button>
      )}

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Próximo
      </Button>
    </Box>
  );
};

export const StepVariant = () => {
  const dispatch = useDispatch();
  const { registerForm, registerSteps } = useSelector((state) => state.product);

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

  return <StepVariantComponent actions={{ nextStep }} />;
};
