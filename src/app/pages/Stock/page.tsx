import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ProductGridList } from "../../components/products/table/list";
import {
  CreateProductPayload,
  CreateProductWithVariantPayload,
  Product,
  RegisterSteps,
} from "../../../features/products/types";
import { IconPlus } from "@tabler/icons-react";
import { ModalComponent } from "../../components/modal";
import { CreateProductComponent } from "../../components/products/create/product";

interface Props {
  data: {
    products: Product[];
    registerSteps: RegisterSteps;
    registerForm: CreateProductPayload | CreateProductWithVariantPayload | null;
  };
  actions: {
    createProduct: (
      value: CreateProductPayload | CreateProductWithVariantPayload
    ) => void;
  };
}

export const StockPage = ({ data, actions }: Props) => {
  const { products, registerSteps, registerForm } = data;
  const { createProduct } = actions;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            Categorias
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
        <ProductGridList data={{ products }} />
      </Box>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateProductComponent
            actions={{ createProduct, onClose: handleCloseModal }}
            data={{ steps: registerSteps, registerForm }}
          />
        }
      />
    </>
  );
};
