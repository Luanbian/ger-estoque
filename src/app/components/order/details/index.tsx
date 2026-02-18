import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Order } from "../../../../features/order/types";
import { convertFromCents } from "../../../../utils/convertTocents";
import { getStatusChip } from "../../../../utils/getStockStatus";
import { formatDate } from "../../../../utils/formatDate";

interface Props {
  data: {
    order: Order;
  };
}

export const OrderDetails = ({ data }: Props) => {
  const { order } = data;
  const { color, label } = getStatusChip(order.status);

  return (
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 500,
        mx: "auto",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        maxHeight: 800,
      }}
    >
      <CardContent
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Detalhes do Pedido
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          <Chip label={`ID: ${order._id}`} size="small" />
          <Chip label={label} color={color} size="small" />
        </Stack>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="subtitle1">Cliente</Typography>
          <Typography variant="body2">{order.customer.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {order.customer.email || "Não informado"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Telefone: {order.customer.phone}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle1">Produtos</Typography>
        <Box
          sx={{
            minHeight: 0,
            maxHeight: 420,
            border: "1px solid",
            borderColor: "divider",
            overflowY: "auto",
            borderRadius: 1,
          }}
        >
          <List dense>
            {order.items.map((item) => (
              <ListItem key={item.productId} disableGutters>
                <ListItemText
                  primary={item.nameSnapshot}
                  secondary={
                    <>
                      Quantidade: {item.quantity} — Preço: R${" "}
                      {convertFromCents(item.priceSnapshot)}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="h6" color="primary">
            R$ {convertFromCents(order.totalAmount)}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            Decisão tomada:{" "}
            {order?.decidedAt
              ? formatDate(order.decidedAt)
              : "Decisão pendente"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
