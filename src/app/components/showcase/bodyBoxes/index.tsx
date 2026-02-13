import { Controller } from "react-hook-form";
import { Box, Grid, TextareaAutosize, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  data: {
    quantity: number;
    registerNames: string[];
    register: any;
    control: any;
  };
}

const MAX_LINES = 10;
const MAX_CHARS = 300;

export const BodyBoxes = ({ data }: Props) => {
  const { quantity, registerNames, control, register } = data;

  if (quantity === 0) return;

  if (quantity === 1)
    return (
      <BodyBox
        data={{ registerNames: registerNames.slice(0, 2), control, register }}
      />
    );

  if (quantity === 2) {
    return (
      <Box>
        <BodyBox
          data={{ registerNames: registerNames.slice(0, 2), control, register }}
        />
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(2, 4),
                control,
                register,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (quantity === 3) {
    return (
      <Box>
        <BodyBox
          data={{ registerNames: registerNames.slice(0, 2), control, register }}
        />
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(2, 4),
                control,
                register,
              }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(4, 6),
                control,
                register,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (quantity === 4) {
    return (
      <Box>
        <BodyBox
          data={{ registerNames: registerNames.slice(0, 2), control, register }}
        />
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(2, 4),
                control,
                register,
              }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(4, 6),
                control,
                register,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(6, 8),
                control,
                register,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (quantity === 5) {
    return (
      <Box>
        <BodyBox
          data={{ registerNames: registerNames.slice(0, 2), control, register }}
        />
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(2, 4),
                control,
                register,
              }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(4, 6),
                control,
                register,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(6, 8),
                control,
                register,
              }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <BodyBox
              data={{
                registerNames: registerNames.slice(8, 10),
                control,
                register,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return;
};

interface BodyBoxProps {
  data: {
    registerNames: string[];
    register: any;
    control: any;
  };
}

const BodyBox = ({ data }: BodyBoxProps) => {
  const { registerNames, control, register } = data;
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      width={"100%"}
    >
      <TextField
        label="Titulo desta caixa"
        fullWidth
        {...register(registerNames[0] as any)}
      />
      <Controller
        name={registerNames[1] as any}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box position="relative" width="100%">
            <TextareaAutosize
              {...field}
              minRows={MAX_LINES}
              maxRows={MAX_LINES}
              maxLength={MAX_CHARS}
              placeholder="Digite o conteúdo desta caixa de informação"
              style={{
                backgroundColor: theme.palette.background.default,
                border: `2px solid ${theme.palette.primary.main}`,
                resize: "none",
                width: "100%",
                overflow: "hidden",
                paddingBottom: "24px",
                boxSizing: "border-box",
              }}
              onChange={(e) => {
                let text = e.target.value;
                let lines = text.split("\n");
                if (lines.length > MAX_LINES) {
                  lines = lines.slice(0, MAX_LINES);
                  text = lines.join("\n");
                }
                if (text.length > MAX_CHARS) {
                  text = text.slice(0, MAX_CHARS);
                }
                field.onChange(text);
              }}
              value={field.value}
            />
            <Box
              position="absolute"
              bottom={4}
              right={8}
              fontSize="0.85rem"
              color={theme.palette.text.secondary}
              zIndex={1}
            >
              {field.value.length}/{MAX_CHARS}
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};
