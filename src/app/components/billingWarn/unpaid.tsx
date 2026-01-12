import { Box, Paper, Typography, Button, Stack, useTheme } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import { useDispatch } from "react-redux";
import { actions } from "../../../features/auth";

export const UnpaidWarning = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <Box
      component="section"
      aria-labelledby="unpaid-title"
      role="alertdialog"
      tabIndex={-1}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(15, 23, 42, 0.75)",
        p: 3,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: { xs: "100%", sm: 700 },
          maxWidth: "100%",
          borderRadius: 2,
          p: { xs: 3, sm: 5 },
          outline: `4px solid ${theme.palette.error.main}33`,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Box
            sx={{
              minWidth: 96,
              minHeight: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              bgcolor: (t) => t.palette.error.light,
              color: (t) => t.palette.error.contrastText,
            }}
          >
            <ReportProblemRoundedIcon sx={{ fontSize: 44 }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              id="unpaid-title"
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Conta inativa — pagamento pendente
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              Não foi possível validar o pagamento da sua conta. Enquanto o
              débito não for regularizado, o acesso ao sistema ficará bloqueado.
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              Para reativar sua conta, realize o pagamento do plano atual. Se já
              efetuou o pagamento, entre em contato com o suporte com o
              comprovante.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={1}>
              <Button
                variant="contained"
                color="error"
                startIcon={<PaymentIcon />}
                sx={{ textTransform: "none" }}
              >
                Ir para Pagamento
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Contatar suporte
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={handleLogout}
              >
                Sair
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
