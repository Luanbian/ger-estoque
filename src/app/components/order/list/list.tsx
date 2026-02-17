import { Grid } from "@mui/material";
import { Order } from "../../../../features/order/types";
import { OrderItem } from "./item";

interface Props {
  data: {
    orders: Order[];
  };
}

export const OrderListComponent = ({ data }: Props) => {
  const { orders } = data;

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {orders.map((order) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={order._id}>
          <OrderItem data={{ order }} />
        </Grid>
      ))}
    </Grid>
  );
};
