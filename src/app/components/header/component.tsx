import { Box, Button, IconButton } from "@mui/material";
import { HealthCheck } from "./healthCheck/container";
import { IconBurger, IconLogout, IconUser } from "@tabler/icons-react";
import { useDispatch } from "../../../store/hooks";
import { actions as authActions } from "../../../features/auth";
import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <Box
      component="header"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <IconBurger size={32} />
      <HealthCheck />
      <IconButton color="primary" size="large" onClick={handleProfile}>
        <IconUser />
      </IconButton>
      <Button
        variant="outlined"
        color="error"
        startIcon={<IconLogout />}
        onClick={handleLogout}
      >
        Sair
      </Button>
    </Box>
  );
};
