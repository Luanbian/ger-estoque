import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { IconArrowForward } from "@tabler/icons-react";
import { actions } from "../../../../../features/products";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  actions: {
    nextStep: (value: IdentificationForm) => void;
  };
  data: {
    name?: string;
  };
}

interface IdentificationForm {
  name: string;
}

const StepIdentificationComponent = ({ actions, data }: Props) => {
  const { nextStep } = actions;
  const { name } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentificationForm>();

  const onSubmit = (data: IdentificationForm) => {
    nextStep(data);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        sx={{ mb: 1 }}
      >
        Identificação do Produto
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Informe o nome para identificar seu produto
      </Typography>

      <TextField
        {...register("name", {
          required: "Este campo é obrigatório",
        })}
        label="Nome do Produto"
        placeholder="Ex: Notebook Dell Inspiron 15"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        variant="outlined"
        sx={{ mb: 3 }}
        autoFocus
        defaultValue={name || ""}
      />

      {errors.name && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.name.message}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

export const StepIdentification = () => {
  const dispatch = useDispatch();
  const { registerForm, registerSteps } = useSelector((state) => state.product);

  const nextStep = (value: IdentificationForm) => {
    dispatch(
      actions.setRegisterSteps({
        status: "category",
        steps: { ...registerSteps.steps, identification: true },
      })
    );
    dispatch(
      actions.setRegisterForm({
        ...registerForm!,
        name: value.name,
      })
    );
  };

  return (
    <StepIdentificationComponent
      actions={{ nextStep }}
      data={{ name: registerForm?.name }}
    />
  );
};
