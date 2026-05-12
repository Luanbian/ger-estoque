import { Box, Button, IconButton } from "@mui/material";
import { HealthCheck } from "./healthCheck/container";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { ASSETS_BASE_URL } from "../../../constants/assets";
import { NotificationHeader } from "./notification/container";

interface Props {
  data: {
    avatar?: string;
  };
  actions: {
    logout: () => void;
    navigateToProfile: () => void;
  };
}
export const HeaderComponent = ({ data, actions }: Props) => {
  const { avatar } = data;
  const { logout, navigateToProfile } = actions;

  return (
    <Box
      component="header"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <img
        src="/logo_animal.png"
        alt="Avatar"
        width={40}
        height={40}
        style={{
          borderRadius: "50%",
        }}
      />
      <HealthCheck />
      <IconButton color="primary" size="large" onClick={navigateToProfile}>
        {avatar ? (
          <img
            src={`${ASSETS_BASE_URL}${avatar}`}
            alt="Avatar"
            width={32}
            height={32}
            style={{
              borderRadius: "50%",
              border: "1px solid white",
              padding: 1,
            }}
          />
        ) : (
          <IconUser />
        )}
      </IconButton>
      <NotificationHeader />
      <Button
        variant="outlined"
        color="error"
        startIcon={<IconLogout />}
        onClick={logout}
      >
        Sair
      </Button>
    </Box>
  );
};
