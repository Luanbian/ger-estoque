import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import {
  Category,
  CreateCategoryPayload,
} from "../../../features/categories/types";
import { CategoryGridList } from "../../components/categories/table/list";
import { ModalComponent } from "../../components/modal";
import { CreateCategoryComponent } from "../../components/categories/create/category";

interface Props {
  data: {
    categories: Category[];
  };
  actions: {
    createCategory: (value: CreateCategoryPayload) => void;
  };
}
export const CategoryPage = ({ data, actions }: Props) => {
  const { categories } = data;
  const { createCategory } = actions;
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
            Nova Categoria
          </Button>
        </Box>
        <CategoryGridList data={{ categories }} />
      </Box>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateCategoryComponent
            actions={{ createCategory }}
            onClose={handleCloseModal}
          />
        }
        maxWidth={550}
      />
    </>
  );
};
