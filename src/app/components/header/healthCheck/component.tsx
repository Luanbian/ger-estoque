import { useState } from "react";
import { Box, Button, Paper, Popover, Typography } from "@mui/material";
import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";

interface HealthCheckProps {
  status: string;
  version: string;
}

export const HealthCheckComponent = ({ status, version }: HealthCheckProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button onClick={handleClick} variant="contained">
        {open ? <IconChevronCompactUp /> : <IconChevronCompactDown />}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          style={{ padding: "16px" }}
        >
          <Paper
            elevation={3}
            style={{
              backgroundColor: status === "ok" ? "green" : "red",
              height: 10,
              width: 10,
              borderRadius: 100,
            }}
          />
          <Typography>status: {status}</Typography>
          <Typography>version: {version}</Typography>
        </Box>
      </Popover>
    </>
  );
};
