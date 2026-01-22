import {
  Container,
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Sales } from "../../../features/sales/types";
import { IconPlus } from "@tabler/icons-react";
import { SaleGridList } from "../../components/sales/table/list";
import { useState } from "react";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateSale } from "../../components/sales/createOrUpdate/sale";

interface Props {
  data: {
    sales: Sales[] | null;
    loading: boolean;
  };
}

export const SalesComponent = ({ data }: Props) => {
  const { sales, loading } = data;

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

        <Box mt={3}>
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
      </Box>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={<CreateOrUpdateSale actions={{ onClose: handleCloseModal }} />}
      />
    </Container>
  );
};
