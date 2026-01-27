import { useForm } from "react-hook-form";
import {
  CreateCustomerPayload,
  Customer,
} from "../../../../features/customers/types";
import { useDispatch } from "../../../../store/hooks";
import { actions as customerActions } from "../../../../features/customers";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

interface Props {
  data: {
    customer?: Customer;
  };
  actions: {
    createCustomer: (value: CreateCustomerPayload) => void;
    onClose?: () => void;
  };
}

const CreateOrUpdateCustomerComponent = ({ actions, data }: Props) => {
  const { customer } = data;
  const { createCustomer, onClose } = actions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCustomerPayload>();

  const onSubmit = (data: CreateCustomerPayload) => {
    createCustomer(data);

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
        {customer?._id ? "Editar Cliente" : "Novo Cliente"}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados para {customer?._id ? "editar" : "criar"} um cliente
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("name", {
            required: "O nome do cliente é obrigatório",
          })}
          label="Nome do Cliente"
          placeholder="Digite o nome do cliente"
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          defaultValue={customer?.name || ""}
        />

        <TextField
          {...register("phone")}
          label="Telefone"
          placeholder="Digite o telefone do cliente"
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone?.message}
          defaultValue={customer?.phone || ""}
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

interface CreateOrUpdateCustomerProps {
  data?: {
    customer?: Customer;
  };
  actions: {
    onClose?: () => void;
  };
}

export const CreateOrUPdateCustomer = ({
  data,
  actions,
}: CreateOrUpdateCustomerProps) => {
  const dispatch = useDispatch();

  const { customer } = data || {};
  const { onClose } = actions;

  const createCustomer = (value: CreateCustomerPayload) => {
    dispatch(customerActions.createCustomerRequest(value));
    dispatch(customerActions.getCustomerMaxSpentRequest());
  };

  return (
    <CreateOrUpdateCustomerComponent
      data={{ customer }}
      actions={{ createCustomer, onClose }}
    />
  );
};
