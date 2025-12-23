import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ProductGridList } from "../../components/products/table/list";
import {
  ProductPayload,
  CreateProductWithVariantPayload,
  Product,
  RegisterSteps,
} from "../../../features/products/types";
import { IconPlus } from "@tabler/icons-react";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateProductComponent } from "../../components/products/createOrUpdate/product";
import { Category } from "../../../features/categories/types";

interface Props {
  data: {
    products: Product[];
    categories: Category[];
    registerSteps: RegisterSteps;
    registerForm: ProductPayload | CreateProductWithVariantPayload | null;
  };
  actions: {
    createProduct: (
      value: ProductPayload | CreateProductWithVariantPayload
    ) => void;
    editProduct: (id: string, productToUpdate: ProductPayload) => void;
    resetForm: () => void;
  };
}

export const StockPage = ({ data, actions }: Props) => {
  const { products, categories, registerSteps, registerForm } = data;
  const { createProduct, editProduct, resetForm } = actions;
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
        <ProductGridList
          data={{ products, categories, registerForm, registerSteps }}
          actions={{ onEdit: editProduct }}
        />
      </Box>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateOrUpdateProductComponent
            actions={{ createProduct, onClose: handleCloseModal }}
            data={{ steps: registerSteps, registerForm }}
          />
        }
      />
    </>
  );
};
