import { CreateSalePayload, Sales } from "../../../../features/sales/types";
import { actions as salesActions } from "../../../../features/sales";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { Product } from "../../../../features/products/types";

interface Props {
  data: {
    sale?: Sales;
    products: Product[] | null;
  };
  actions: {
    createSale: (data: CreateSalePayload) => void;
    onClose?: () => void;
  };
}

const CreateOrUpdateCategoryComponent = ({ data, actions }: Props) => {
  const { sale, products } = data;
  const { createSale, onClose } = actions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSalePayload>();

  const onSubmit = (data: CreateSalePayload) => {
    createSale(data);

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
          {...register("quantity", {
            required: "A quantidade é obrigatória",
          })}
          label="Quantidade do produto"
          placeholder="Digite a quantidade do produto"
          fullWidth
          required
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
          defaultValue={sale?.quantity || "0"}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Produto vendido</InputLabel>
          <Select
            label="Produto vendido"
            {...register("productId", { required: false })}
          >
            {!products || products?.length === 0 ? (
              <MenuItem disabled>Nenhum produto encontrado</MenuItem>
            ) : (
              products.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

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
  const { dataPlain } = useSelector((state) => state.product);

  const { sale } = data || {};
  const { onClose } = actions;

  const createSale = (data: CreateSalePayload) => {
    dispatch(salesActions.createSaleRequest(data));
  };

  return (
    <CreateOrUpdateCategoryComponent
      data={{ sale, products: dataPlain }}
      actions={{ createSale, onClose }}
    />
  );
};
