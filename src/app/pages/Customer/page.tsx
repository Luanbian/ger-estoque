import {
  Box,
  Container,
  Stack,
  Typography,
  Pagination as MUIPagination,
  CircularProgress,
} from "@mui/material";
import { Pagination } from "../../../features/common/types";
import { Customer } from "../../../features/customers/types";
import { CustomerGridList } from "../../components/customers/table/list";
import { CustomerFilter } from "../../components/customers/filters";

interface Props {
  data: {
    customers: Customer[] | null;
    loading: boolean;
    pagination: Pagination | null;
  };
  actions: {
    onChangePage: (page: number) => void;
  };
}

export const CustomerPage = ({ data, actions }: Props) => {
  const { customers, loading, pagination } = data;
  const { onChangePage } = actions;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Clientes
            </Typography>
            <Typography color="text.secondary">
              Resumo dos seus clientes do sistema
            </Typography>
          </Box>
        </Stack>

        <Box display={"flex"} flexDirection="column" gap={4} paddingInline={2}>
          <CustomerFilter />
          {loading ? (
            <CircularProgress />
          ) : !customers || customers.length === 0 ? (
            <Typography variant="body1">Nenhum cliente encontrado.</Typography>
          ) : (
            <CustomerGridList data={{ customers }} />
          )}
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          {pagination && (
            <MUIPagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={(_, page) => onChangePage(page)}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};
