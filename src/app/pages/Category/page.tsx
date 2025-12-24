import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { Category } from "../../../features/categories/types";
import { CategoryGridList } from "../../components/categories/table/list";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateCategory } from "../../components/categories/createOrUpdate/category";

interface Props {
  data: {
    categories: Category[];
  };
}

export const CategoryPage = ({ data }: Props) => {
  const { categories } = data;
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
          <CreateOrUpdateCategory actions={{ onClose: handleCloseModal }} />
        }
        maxWidth={550}
      />
    </>
  );
};
