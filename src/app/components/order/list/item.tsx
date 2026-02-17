import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Order } from "../../../../features/order/types";
import { useDispatch } from "../../../../store/hooks";
import { actions } from "../../../../features/order";
import { OrderStatus } from "../../../../features/common/orderStatusEnum";

interface Props {
  data: {
    order: Order;
  };
  actions: {
    handleAccept: () => void;
    handleReject: () => void;
  };
}

const OrderItemComponent = ({ data, actions }: Props) => {
  const { order } = data;
  const { handleAccept, handleReject } = actions;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ pb: 1, flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Pedido #{order._id}
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
          Cliente: {order.customer.name}
        </Typography>
      </CardContent>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mb: 1,
            bgcolor:
              order.status === OrderStatus.ACCEPTED ? "#4caf50ff" : "#222",
            borderRadius: 2,
          }}
          onClick={handleAccept}
        >
          Aceitar
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
            bgcolor:
              order.status === OrderStatus.REJECTED ? "#ff4d4dff" : "#222",
          }}
          onClick={handleReject}
        >
          Rejeitar
        </Button>
      </Box>
    </Card>
  );
};

interface OrderItemProps {
  data: {
    order: Order;
  };
}

export const OrderItem = ({ data }: OrderItemProps) => {
  const dispatch = useDispatch();
  const { order } = data;

  const handleAccept = () => {
    dispatch(
      actions.updateOrderStatusRequest({
        orderId: order._id,
        status: OrderStatus.ACCEPTED,
      }),
    );
  };

  const handleReject = () => {
    dispatch(
      actions.updateOrderStatusRequest({
        orderId: order._id,
        status: OrderStatus.REJECTED,
      }),
    );
  };

  return (
    <OrderItemComponent
      data={{ order }}
      actions={{ handleAccept, handleReject }}
    />
  );
};
