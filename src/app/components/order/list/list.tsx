import { Grid } from "@mui/material";
import { Order } from "../../../../features/order/types";
import { OrderItem } from "./item";
import { Whatsapp } from "../../../../features/whatsapp/types";

interface Props {
  data: {
    orders: Order[];
    whatsapp: Whatsapp | null;
  };
}

export const OrderListComponent = ({ data }: Props) => {
  const { orders, whatsapp } = data;

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {orders.map((order) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={order._id}>
          <OrderItem data={{ order, whatsapp }} />
        </Grid>
      ))}
    </Grid>
  );
};
