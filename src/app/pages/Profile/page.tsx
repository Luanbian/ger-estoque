import { AccountShopkeeper } from "../../../features/accountShopkeeper/types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

interface Props {
  data: {
    account: AccountShopkeeper;
  };
}

export const ProfilePage = ({ data }: Props) => {
  const { account } = data;

  const name = account?.accountShopkeeper?.name ?? "-";
  const email = account?.auth?.email ?? "-";
  const cnpj = account?.accountShopkeeper?.cnpj ?? "-";
  const planId = account?.subscription?.planTypeId ?? "-";
  const billingStatus = account?.subscription?.billingStatus ?? "-";
  const cardBrand = account?.subscription?.card?.brand ?? "-";
  const cardDigits = account?.subscription?.card?.digits ?? "-";
  const expiresAt = account?.subscription?.expiresAt
    ? new Date(account.subscription.expiresAt).toLocaleDateString()
    : "-";

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "33%" } }}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardHeader
              avatar={
                <img
                  src="/masc_profile.png"
                  alt="Avatar"
                  width={64}
                  height={64}
                  style={{ borderRadius: "50%" }}
                />
              }
              title={<Typography variant="h6">{name}</Typography>}
              subheader={<Typography variant="body2">{email}</Typography>}
              sx={{ alignItems: "center" }}
            />
            <Divider />
            <CardContent>
              <Stack spacing={1.25}>
                <Typography variant="subtitle2" color="text.secondary">
                  Identificação da Empresa
                </Typography>
                <Typography variant="body1">CNPJ: {cnpj}</Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Método de Pagamento
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={cardBrand} color="primary" size="small" />
                  <Typography variant="body2" color="text.secondary">
                    • • • • {cardDigits}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "67%" } }}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardHeader
              title={<Typography variant="h6">Assinatura</Typography>}
              subheader={
                <Typography variant="body2">Detalhes da assinatura</Typography>
              }
            />
            <Divider />
            <CardContent>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Plano
                  </Typography>
                  <Typography variant="body1">{planId}</Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status de Cobrança
                  </Typography>
                  <Chip label={billingStatus} color="info" />
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Vence em
                  </Typography>
                  <Typography variant="body1">{expiresAt}</Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contato
                  </Typography>
                  <Typography variant="body1">{email}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
