import {
  Container,
  Box,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { Sales } from "../../../features/sales/types";
import { IconPlus } from "@tabler/icons-react";
import { Product } from "../../../features/products/types";
import { SaleGridList } from "../../components/sales/table/list";
import { useState } from "react";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateSale } from "../../components/sales/createOrUpdate/sale";

interface Props {
  data: {
    sales: Sales[];
    products: Product[] | null;
  };
}

export const SalesComponent = ({ data }: Props) => {
  const { sales, products } = data;

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
            {sales && sales.length > 0 ? (
              <SaleGridList data={{ sales, products }} />
            ) : (
              <Box p={6} textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Ainda não há vendas
                </Typography>
                <Typography color="text.secondary">
                  Quando você registrar vendas, elas aparecerão aqui.
                </Typography>
              </Box>
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
