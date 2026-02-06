import React, { useState, useRef } from "react";
import { IconUser, IconPencil } from "@tabler/icons-react";
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
import { useTheme } from "@mui/material/styles";
import { ASSETS_BASE_URL } from "../../../constants/assets";

interface Props {
  data: {
    account: AccountShopkeeper;
    planName: string;
  };
  actions: {
    updateAvatar: (avatar: File) => void;
  };
}

export const ProfilePage = ({ data, actions }: Props) => {
  const { account, planName } = data;
  const { updateAvatar } = actions;
  const theme = useTheme();

  const [avatarHovered, setAvatarHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateAvatar(file);
    }
  };

  const name = account?.accountShopkeeper?.name ?? "-";
  const email = account?.auth?.email ?? "-";
  const cnpj = account?.accountShopkeeper?.cnpj ?? "-";
  const billingStatus = account?.subscription?.billingStatus ?? "-";
  const cardBrand = account?.subscription?.card?.brand ?? "-";
  const cardDigits = account?.subscription?.card?.digits ?? "-";
  const expiresAt = account?.subscription?.expiresAt
    ? new Date(account.subscription.expiresAt).toLocaleDateString()
    : "-";
  const avatar = account?.accountShopkeeper?.avatar;

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
                <Box
                  sx={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setAvatarHovered(true)}
                  onMouseLeave={() => setAvatarHovered(false)}
                >
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {avatarHovered ? (
                      <Box onClick={handlePencilClick}>
                        <IconPencil
                          size={24}
                          color={theme.palette.primary.main}
                          style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                          }}
                        />
                      </Box>
                    ) : avatar ? (
                      <img
                        src={`${ASSETS_BASE_URL}${avatar}`}
                        alt="Avatar"
                        width={40}
                        height={40}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <IconUser size={40} color={theme.palette.primary.main} />
                    )}
                  </>
                </Box>
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
                  <Typography variant="body1">{planName}</Typography>
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
