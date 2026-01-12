import { Box, Paper, Typography, Button, Stack, useTheme } from "@mui/material";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

interface Props {
  data: {
    featureName: string;
  };
}
export const FeatureNotAllowed = ({ data }: Props) => {
  const { featureName } = data;

  const theme = useTheme();
  return (
    <Box
      component="section"
      aria-labelledby="feature-not-allowed-title"
      role="alert"
      tabIndex={-1}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          outline: `2px solid ${theme.palette.warning.main}22`,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <Box
            sx={{
              minWidth: 72,
              minHeight: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              bgcolor: (t) => t.palette.warning.light,
              color: (t) => t.palette.warning.contrastText,
            }}
          >
            <BlockRoundedIcon sx={{ fontSize: 34 }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              id="feature-not-allowed-title"
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Recurso não disponível
            </Typography>

            <Typography variant="body2" color="text.secondary">
              O recurso {featureName} não está habilitado para sua conta. Entre
              em contato com o administrador ou atualize seu plano para acessar
              este recurso.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
              <Button
                variant="contained"
                color="warning"
                sx={{ textTransform: "none" }}
              >
                Ver planos
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Contatar suporte
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default FeatureNotAllowed;
