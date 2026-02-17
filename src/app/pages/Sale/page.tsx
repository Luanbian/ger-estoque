import { Box, Typography } from "@mui/material";
import { WebSocketEvent } from "../../../features/ws/types";

interface Props {
  data: {
    notifications: WebSocketEvent[];
  };
}

export const SaleComponent = ({ data }: Props) => {
  const { notifications } = data;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Página de Vendas
      </Typography>
      <Typography color="text.secondary">
        Esta é a página de vendas do sistema.
      </Typography>
      <Box mt={4}>
        <Typography variant="h6" component="h2" gutterBottom>
          Notificações Recebidas:
        </Typography>
        {notifications.length === 0 ? (
          <Typography color="text.secondary">
            Nenhuma notificação recebida.
          </Typography>
        ) : (
          notifications.map((notification, index) => (
            <Box
              key={index}
              mb={2}
              p={2}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
            >
              <Typography variant="subtitle1">{notification.type}</Typography>
              <Typography color="text.secondary">
                {notification.orderId}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
