import { Box, Button } from "@mui/material";
import { HealthCheck } from "./healthCheck/container";
import { IconBurger, IconLogout } from "@tabler/icons-react";
import { useDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { actions as authActions } from "../../../features/auth";

export const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
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
