import {
  Container,
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  CircularProgress,
  Pagination as MUIPagination,
} from "@mui/material";
import { Sales } from "../../../features/sales/types";
import { IconPlus } from "@tabler/icons-react";
import { SaleGridList } from "../../components/sales/table/list";
import { useState } from "react";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateSale } from "../../components/sales/createOrUpdate/sale";
import { Pagination } from "../../../features/common/types";

interface Props {
  data: {
    sales: Sales[] | null;
    loading: boolean;
    pagination: Pagination | null;
  };
  actions: {
    onChangePage: (page: number) => void;
  };
}

export const SalesComponent = ({ data, actions }: Props) => {
  const { sales, loading, pagination } = data;
  const { onChangePage } = actions;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              Vendas
            </Typography>
            <Typography color="text.secondary">
              Resumo das vendas do sistema
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleOpenModal}
              startIcon={<IconPlus size={20} />}
            >
              Nova venda
            </Button>
          </Stack>
        </Stack>

        <Box display={"flex"} flexDirection="column" gap={4} paddingInline={2}>
          <Paper elevation={2} sx={{ overflow: "hidden" }}>
            {loading ? (
              <CircularProgress />
            ) : !sales || sales.length === 0 ? (
              <Typography variant="body1">Nenhuma venda encontrada.</Typography>
            ) : (
              <SaleGridList data={{ sales }} />
            )}
          </Paper>
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

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={<CreateOrUpdateSale actions={{ onClose: handleCloseModal }} />}
      />
    </Container>
  );
};
