import { Box, Button, Typography } from "@mui/material";
import { actions } from "../../../../../features/products";
import { useDispatch, useSelector } from "../../../../../store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  actions: {
    nextStep: (value: IdentificationForm) => void;
  };
}

interface IdentificationForm {
  name: string;
}

const StepIdentificationComponent = ({ actions }: Props) => {
  const { nextStep } = actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentificationForm>();

  const onSubmit = (data: IdentificationForm) => {
    nextStep(data);
  };

  return (
    <Box>
      <Typography variant="h2">Identificação do Produto</Typography>

      <input
        {...register("name", { required: true })}
        placeholder="Nome do Produto"
      />
      {errors.name && <span>Este campo é obrigatório</span>}

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Próximo
      </Button>
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

  return <StepIdentificationComponent actions={{ nextStep }} />;
};
