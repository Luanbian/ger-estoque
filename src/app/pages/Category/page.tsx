import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Pagination as MUIPagination,
  Typography,
} from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { Category } from "../../../features/categories/types";
import { CategoryGridList } from "../../components/categories/table/list";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateCategory } from "../../components/categories/createOrUpdate/category";
import { CategoryFilter } from "../../components/categories/filters";
import { Pagination } from "../../../features/common/types";

interface Props {
  data: {
    categories: Category[] | null;
    loading: boolean;
    pagination: Pagination | null;
  };
  actions: {
    onChangePage: (page: number) => void;
  };
}

export const CategoryPage = ({ data, actions }: Props) => {
  const { categories, loading, pagination } = data;
  const { onChangePage } = actions;
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

        <Box display={"flex"} flexDirection="column" gap={4} paddingInline={2}>
          <CategoryFilter />
          {loading ? (
            <CircularProgress />
          ) : !categories || categories.length === 0 ? (
            <Typography variant="body1">
              Nenhuma categoria encontrada.
            </Typography>
          ) : (
            <CategoryGridList data={{ categories }} />
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
