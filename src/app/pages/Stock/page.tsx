import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ProductGridList } from "../../components/products/table/list";
import { Product } from "../../../features/products/types";
import { IconPlus } from "@tabler/icons-react";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateProduct } from "../../components/products/createOrUpdate/product";
import { Category } from "../../../features/categories/types";
import { ProductFilters } from "../../components/products/filters";

interface Props {
  data: {
    products: Product[] | null;
    categories: Category[];
    loading: boolean;
  };
  actions: {
    resetForm: () => void;
  };
}

export const StockPage = ({ data, actions }: Props) => {
  const { products, categories, loading } = data;
  const { resetForm } = actions;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <>
      <Box>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          paddingInline={2}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Produtos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<IconPlus size={20} />}
          >
            Novo Produto
          </Button>
        </Box>

        <Box display={"flex"} flexDirection="column" gap={4} paddingInline={2}>
          <ProductFilters />
          {loading ? (
            <CircularProgress />
          ) : !products || products.length === 0 ? (
            <Typography variant="body1">Nenhum produto encontrado.</Typography>
          ) : (
            <ProductGridList data={{ products, categories }} />
          )}
        </Box>
      </Box>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateOrUpdateProduct actions={{ cancel: handleCloseModal }} />
        }
      />
    </>
  );
};
