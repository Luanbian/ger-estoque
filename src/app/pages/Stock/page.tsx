import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ProductGridList } from "../../components/products/table/list";
import { Product } from "../../../features/products/types";
import { IconPlus } from "@tabler/icons-react";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateProduct } from "../../components/products/createOrUpdate/product";
import { Category } from "../../../features/categories/types";

interface Props {
  data: {
    products: Product[];
    categories: Category[];
  };
  actions: {
    resetForm: () => void;
  };
}

export const StockPage = ({ data, actions }: Props) => {
  const { products, categories } = data;
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
        <ProductGridList data={{ products, categories }} />
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
