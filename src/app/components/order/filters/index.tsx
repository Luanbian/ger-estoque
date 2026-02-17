import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { OrderStatus } from "../../../../features/common/orderStatusEnum";
import { SaleFilters } from "../../../../features/filters/types";
import { orderMapper } from "../../../../utils/orderMapper";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { actions } from "../../../../features/filters";
import { actions as orderActions } from "../../../../features/order";

interface Props {
  data: {
    order: SaleFilters;
  };
  actions: {
    onChangeStatus: (status: OrderStatus) => void;
  };
}

const OrderFilterComponent = ({ data, actions }: Props) => {
  const { order } = data;
  const { onChangeStatus } = actions;

  const handleStatusChange = (_: any, newValue: string | null) => {
    if (newValue) {
      onChangeStatus(newValue as OrderStatus);
    }
  };

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
        Status do pedido
      </Typography>
      <ToggleButtonGroup
        value={order.status || ""}
        exclusive
        onChange={handleStatusChange}
        sx={{ flexWrap: "wrap", gap: 1 }}
        size="small"
      >
        {Object.entries(orderMapper).map(([key, value]) => (
          <ToggleButton key={key} value={key}>
            {value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Grid>
  );
};

export const OrderFilter = () => {
  const dispatch = useDispatch();
  const { sale } = useSelector((state) => state.filter);

  const onChangeStatus = (status: OrderStatus) => {
    dispatch(actions.setSaleStatus(status));
    dispatch(orderActions.getOrdersRequest());
  };

  return (
    <OrderFilterComponent data={{ order: sale }} actions={{ onChangeStatus }} />
  );
};
