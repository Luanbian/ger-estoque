import { Box, Typography } from "@mui/material";
import pkg from "../../../../package.json";

export const Version = () => {
  return (
    <Box sx={{ position: "fixed", bottom: 16, left: 16 }}>
      <Typography variant="caption" color="text.secondary">
        v{pkg.version}
      </Typography>
    </Box>
  );
};
