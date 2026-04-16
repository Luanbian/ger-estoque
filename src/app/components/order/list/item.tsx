import { useState } from "react";
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
import { strSlice } from "../../../../utils/strSlice";
import { IconCircleCheck, IconClock, IconXboxX } from "@tabler/icons-react";
import { convertFromCents } from "../../../../utils/convertTocents";
import { ModalComponent } from "../../modal";
import { OrderDetails } from "../details";
import { Whatsapp } from "../../../../features/whatsapp/types";
import { openWhatsapp } from "../../../../utils/openWhatsapp";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      sx={{
        borderRadius: "2%",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <Box onClick={handleOpenModal}>
        <CardContent
          sx={{
            pb: 1,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {order.status === OrderStatus.PENDING ? (
            <IconClock size={25} color="orange" />
          ) : order.status === OrderStatus.ACCEPTED ? (
            <IconCircleCheck size={25} color="green" />
          ) : (
            <IconXboxX size={25} color="red" />
          )}
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Pedido #{strSlice(order._id)}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent
          sx={{
            pb: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            minHeight: 140,
          }}
        >
          {order.items.slice(0, 3).map((item, index) => (
            <Box
              key={index}
              justifyContent={"space-between"}
              display={"flex"}
              gap={1}
              width={"100%"}
            >
              <Typography>
                {item.nameSnapshot} x{item.quantity}
              </Typography>
              <Typography>R$ {convertFromCents(item.priceSnapshot)}</Typography>
            </Box>
          ))}
          {order.items.length > 3 && (
            <Typography variant="caption" color="textSecondary">
              ... mais {order.items.length - 3} produtos
            </Typography>
          )}
        </CardContent>
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
            Total:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
            R$ {convertFromCents(order.totalAmount)}
          </Typography>
        </Box>
        <Divider />
        <Box marginBlock={2}>
          <Typography variant="subtitle2" color="textSecondary">
            {order.customer.name}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box sx={{ p: 2 }} display={"flex"} gap={2}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 2,
          }}
          onClick={handleReject}
        >
          Rejeitar
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
          }}
          onClick={handleAccept}
        >
          Aceitar
        </Button>
      </Box>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={<OrderDetails data={{ order }} />}
      />
    </Card>
  );
};

interface OrderItemProps {
  data: {
    order: Order;
    whatsapp: Whatsapp | null;
  };
}

export const OrderItem = ({ data }: OrderItemProps) => {
  const dispatch = useDispatch();
  const { order, whatsapp } = data;

  const handleAccept = async () => {
    dispatch(
      actions.updateOrderStatusRequest({
        orderId: order._id,
        status: OrderStatus.ACCEPTED,
      }),
    );
    await openWhatsapp(order.customer.phone, whatsapp?.acceptedMessage);
  };

  const handleReject = async () => {
    dispatch(
      actions.updateOrderStatusRequest({
        orderId: order._id,
        status: OrderStatus.REJECTED,
      }),
    );
    await openWhatsapp(order.customer.phone, whatsapp?.rejectedMessage);
  };

  return (
    <OrderItemComponent
      data={{ order }}
      actions={{ handleAccept, handleReject }}
    />
  );
};
