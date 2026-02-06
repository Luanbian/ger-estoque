import {
  Box,
  Container,
  Stack,
  Typography,
  Pagination as MUIPagination,
  CircularProgress,
  Button,
} from "@mui/material";
import { Pagination } from "../../../features/common/types";
import { Customer } from "../../../features/customers/types";
import { CustomerGridList } from "../../components/customers/table/list";
import { CustomerFilter } from "../../components/customers/filters";
import { ModalComponent } from "../../components/modal";
import { useState } from "react";
import { CreateOrUPdateCustomer } from "../../components/customers/createOrUpdate/customer";
import { IconPlus } from "@tabler/icons-react";
import { Tabs } from "../../components/tabs";
import { FavoriteCustomerFilter } from "../../components/customers/filters/favorites";

interface Props {
  data: {
    customers: Customer[] | null;
    favorites: Customer[] | null;
    loading: boolean;
    loadingFavorites: boolean;
    pagination: Pagination | null;
    paginationFavorites: Pagination | null;
  };
  actions: {
    onChangePage: (page: number) => void;
    onChangePageFavorites: (page: number) => void;
  };
}

export const CustomerPage = ({ data, actions }: Props) => {
  const {
    customers,
    favorites,
    loading,
    loadingFavorites,
    pagination,
    paginationFavorites,
  } = data;
  const { onChangePage, onChangePageFavorites } = actions;
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
              Clientes
            </Typography>
            <Typography color="text.secondary">
              Resumo dos seus clientes do sistema
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<IconPlus size={20} />}
          >
            Novo Cliente
          </Button>
        </Stack>

        <Tabs
          data={{
            tabs: [
              {
                label: "Clientes",
                content: (
                  <>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      gap={4}
                      paddingInline={2}
                    >
                      <CustomerFilter />
                      {loading ? (
                        <CircularProgress />
                      ) : !customers || customers.length === 0 ? (
                        <Typography variant="body1">
                          Nenhum cliente encontrado.
                        </Typography>
                      ) : (
                        <CustomerGridList data={{ customers }} />
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
                  </>
                ),
              },
              {
                label: "Favoritos",
                content: (
                  <>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      gap={4}
                      paddingInline={2}
                    >
                      <FavoriteCustomerFilter />
                      {loadingFavorites ? (
                        <CircularProgress />
                      ) : !favorites || favorites.length === 0 ? (
                        <Typography variant="body1">
                          Nenhum cliente favorito encontrado.
                        </Typography>
                      ) : (
                        <CustomerGridList data={{ customers: favorites }} />
                      )}
                    </Box>
                    <Box mt={4} display="flex" justifyContent="center">
                      {paginationFavorites && (
                        <MUIPagination
                          count={paginationFavorites.totalPages}
                          page={paginationFavorites.page}
                          onChange={(_, page) => onChangePageFavorites(page)}
                        />
                      )}
                    </Box>
                  </>
                ),
              },
            ],
          }}
        />
      </Box>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateOrUPdateCustomer actions={{ onClose: handleCloseModal }} />
        }
      />
    </Container>
  );
};
