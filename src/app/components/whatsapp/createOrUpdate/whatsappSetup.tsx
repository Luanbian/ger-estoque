import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IconBrandWhatsapp, IconCheck, IconX } from "@tabler/icons-react";
import { useDispatch } from "../../../../store/hooks";
import { Whatsapp } from "../../../../features/whatsapp/types";
import { actions as wpActions } from "../../../../features/whatsapp";

type WhatsappFormValues = Pick<Whatsapp, "acceptedMessage" | "rejectedMessage">;

interface Props {
  data: {
    whatsapp: Whatsapp | null;
  };
  actions: {
    createWhatsappSetup: (value: Whatsapp) => void;
    updateWhatsappSetup: (value: Whatsapp) => void;
  };
}

export const CreateOrUpdateWhatsappSetupComponent = ({
  data,
  actions,
}: Props) => {
  const { whatsapp } = data;
  const { createWhatsappSetup, updateWhatsappSetup } = actions;

  const theme = useTheme();
  const whatsappGreen = "#25D366";

  const { control, handleSubmit } = useForm<WhatsappFormValues>({
    defaultValues: {
      acceptedMessage: whatsapp?.acceptedMessage ?? "",
      rejectedMessage: whatsapp?.rejectedMessage ?? "",
    },
  });

  const onSubmit = (values: WhatsappFormValues) => {
    if (whatsapp?._id) {
      updateWhatsappSetup({ ...whatsapp, ...values });
    } else {
      createWhatsappSetup(values as Whatsapp);
    }
  };

  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${whatsappGreen} 0%, #128C7E 100%)`,
          px: 3,
          pt: 3,
          pb: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          >
            <IconBrandWhatsapp size={26} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#fff">
              Mensagens Automáticas
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              Configure os textos enviados ao cliente via WhatsApp
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1.5 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: `${theme.palette.success.main}18`,
                color: theme.palette.success.main,
              }}
            >
              <IconCheck size={16} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="text.primary"
            >
              Pedido Aceito
            </Typography>
            <Chip
              label="Aprovado"
              size="small"
              sx={{
                backgroundColor: `${theme.palette.success.main}18`,
                color: theme.palette.success.dark,
                fontWeight: 500,
                fontSize: 11,
                height: 20,
              }}
            />
          </Stack>

          <Controller
            name="acceptedMessage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                fullWidth
                placeholder="Olá {nome}! Seu pedido #{numero} foi aceito e está sendo preparado. 🎉"
                helperText="Use {nome} e {numero} para personalizar a mensagem"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.success.main,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiFormHelperText-root": { fontSize: 11, mt: 0.75 },
                }}
              />
            )}
          />
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1.5 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: `${theme.palette.error.main}18`,
                color: theme.palette.error.main,
              }}
            >
              <IconX size={16} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="text.primary"
            >
              Pedido Rejeitado
            </Typography>
            <Chip
              label="Recusado"
              size="small"
              sx={{
                backgroundColor: `${theme.palette.error.main}18`,
                color: theme.palette.error.dark,
                fontWeight: 500,
                fontSize: 11,
                height: 20,
              }}
            />
          </Stack>

          <Controller
            name="rejectedMessage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                fullWidth
                placeholder="Olá {nome}! Infelizmente seu pedido #{numero} não pôde ser aceito. Entre em contato para mais informações."
                helperText="Use {nome} e {numero} para personalizar a mensagem"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.error.main,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiFormHelperText-root": { fontSize: 11, mt: 0.75 },
                }}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            pt: 1,
            pb: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              backgroundColor: whatsappGreen,
              "&:hover": { backgroundColor: "#128C7E" },
            }}
          >
            {whatsapp?._id ? "Atualizar" : "Criar"}
          </Button>
        </Box>
      </Stack>
    </>
  );
};

interface CreateOrUpdateWhatsappSetupProps {
  data: {
    whatsapp: Whatsapp | null;
  };
}

export const CreateOrUpdateWhatsappSetup = ({
  data,
}: CreateOrUpdateWhatsappSetupProps) => {
  const { whatsapp } = data;
  const dispatch = useDispatch();

  const createWhatsappSetup = (value: Whatsapp) => {
    dispatch(wpActions.createWhatsappRequest(value));
  };

  const updateWhatsappSetup = (value: Whatsapp) => {
    dispatch(wpActions.updateWhatsappRequest(value));
  };

  return (
    <CreateOrUpdateWhatsappSetupComponent
      data={{ whatsapp }}
      actions={{
        createWhatsappSetup,
        updateWhatsappSetup,
      }}
    />
  );
};
