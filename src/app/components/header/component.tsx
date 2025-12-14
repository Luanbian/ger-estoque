import { Box } from "@mui/material";
import { HealthCheck } from "./healthCheck/container";
import { IconBurger } from "@tabler/icons-react";

export const HeaderComponent = () => {
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
    </Box>
  );
};
