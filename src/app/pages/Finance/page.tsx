import { Box, Typography } from "@mui/material";

export const FinancePage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Sistema de Gerenciamento Financeiro
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Selecione uma opção no menu lateral para começar.
      </Typography>
    </Box>
  );
};
