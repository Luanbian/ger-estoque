import React, { useState } from "react";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { IconBell, IconBellRinging } from "@tabler/icons-react";
import { WebSocketEvent } from "../../../../features/ws/types";

interface Props {
  data: {
    notifications: WebSocketEvent[];
  };
  actions: {
    navigateToSale: () => void;
    clearNotifications: () => void;
  };
}

export const NotificationHeaderComponent = ({ data, actions }: Props) => {
  const { notifications } = data;
  const { navigateToSale, clearNotifications } = actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    clearNotifications();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="primary" size="large" onClick={handleClick}>
        {notifications.length > 0 ? (
          <Badge badgeContent={notifications.length} color="error">
            <IconBellRinging />
          </Badge>
        ) : (
          <IconBell />
        )}
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClick={navigateToSale}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="h6" p={1} textAlign={"center"}>
          Seus Pedidos
        </Typography>
        <Divider />
        {notifications.length === 0 ? (
          <Typography variant="body1" p={2}>
            Nenhum pedido novo.
          </Typography>
        ) : (
          notifications.map((notification, index) => (
            <Box key={index} padding={2}>
              <Typography variant="h6">Novo pedido!</Typography>
              <Typography variant="body2" color="textSecondary">
                Criado em: {new Date(notification.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))
        )}
      </Popover>
    </>
  );
};
