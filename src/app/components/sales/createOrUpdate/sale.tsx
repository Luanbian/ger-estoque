import { useForm } from "react-hook-form";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CreateSalePayload, Sales } from "../../../../features/sales/types";
import { actions as salesActions } from "../../../../features/sales";
import { actions as productsActions } from "../../../../features/products";
import { useDispatch } from "../../../../store/hooks";
import { AsyncSelect, Option } from "../../asyncSelect";
import { useState } from "react";

interface Props {
  data: {
    sale?: Sales;
  };
  actions: {
    createSale: (data: CreateSalePayload) => void;
    onClose?: () => void;
  };
}

const CreateOrUpdateCategoryComponent = ({ data, actions }: Props) => {
  const { sale } = data;
  const { createSale, onClose } = actions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; items: { quantity: string }[] }>();

  const [selected, setSelected] = useState<Option[] | null>(null);

  const onSubmit = (data: { name: string; items: { quantity: string }[] }) => {
    const buildItems = selected?.map((item, index) => ({
      productId: item.value,
      name: item.label,
      quantity: Number(data.items[index]?.quantity || "0"),
    })) as CreateSalePayload["items"];

    const payload: CreateSalePayload = {
      name: data.name,
      items: buildItems,
    };

    createSale(payload);

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
        {sale?._id ? "Editar Venda" : "Nova Venda"}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para {sale?._id ? "editar" : "criar"} uma venda
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("name")}
          label="Titulo da venda"
          placeholder="Digite o titulo da venda"
          fullWidth
          helperText={errors.name?.message}
        />

        <AsyncSelect
          data={{ endpoint: "/product" }}
          actions={{ onChange: (value) => setSelected(value as Option[]) }}
        />

        {selected &&
          selected.length > 0 &&
          selected.map((item, index) => (
            <TextField
              key={index}
              {...register(`items.${index}.quantity`, {
                required: "A quantidade é obrigatória",
              })}
              label={`Quantidade do produto ${item.label}`}
              placeholder={`Digite a quantidade de ${item.label}`}
              fullWidth
              required
              error={!!errors.items && !!errors.items[index]?.quantity}
              helperText={errors.items?.[index]?.quantity?.message}
              defaultValue={sale?.items?.[index]?.quantity || "0"}
            />
          ))}

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
            Confirmar Venda
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

interface CreateOrUpdateSaleProps {
  data?: {
    sale?: Sales;
  };
  actions: {
    onClose?: () => void;
  };
}

export const CreateOrUpdateSale = ({
  data,
  actions,
}: CreateOrUpdateSaleProps) => {
  const dispatch = useDispatch();

  const { sale } = data || {};
  const { onClose } = actions;

  const createSale = (data: CreateSalePayload) => {
    dispatch(salesActions.createSaleRequest(data));
    dispatch(productsActions.productTreeRequest());
  };

  return (
    <CreateOrUpdateCategoryComponent
      data={{ sale }}
      actions={{ createSale, onClose }}
    />
  );
};
