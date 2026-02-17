import {
  Box,
  CircularProgress,
  Pagination as MuiPagination,
  Typography,
} from "@mui/material";
import { Order } from "../../../features/order/types";
import { Pagination } from "../../../features/common/types";
import { OrderFilter } from "../../components/order/filters";
import { OrderListComponent } from "../../components/order/list/list";

interface Props {
  data: {
    orders: Order[] | null;
    loading: boolean;
    pagination: Pagination | null;
  };
  actions: {
    onChangePage: (page: number) => void;
  };
}

export const SaleComponent = ({ data, actions }: Props) => {
  const { orders, loading, pagination } = data;
  const { onChangePage } = actions;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom mb={2}>
        Página de Pedidos
      </Typography>
      <OrderFilter />
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {!orders || orders.length === 0 ? (
              <Typography color="text.secondary">
                Nenhum pedido encontrado.
              </Typography>
            ) : (
              <OrderListComponent data={{ orders }} />
            )}
          </>
        )}
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        {pagination && (
          <MuiPagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={(_, page) => onChangePage(page)}
          />
        )}
      </Box>
    </Box>
  );
};
