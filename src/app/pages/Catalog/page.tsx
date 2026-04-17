import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { IconPackage, IconPlus, IconTag } from "@tabler/icons-react";
import {
  CatalogCategory,
  CatalogCategoryAssociate,
  CatalogCategoryPayload,
  CatalogItem,
} from "../../../features/catalog/types";
import { ModalComponent } from "../../components/modal";
import { CreateCatalogCategory } from "../../components/catalog/createCategory";
import { CreateCatalogItem } from "../../components/catalog/createItem";
import { ASSETS_BASE_URL } from "../../../constants/assets";

interface Props {
  data: {
    categories: CatalogCategory[] | null;
    items: CatalogItem[] | null;
    loading: boolean;
    showcaseId: string;
  };
  actions: {
    createCatalogCategory: (data: CatalogCategoryPayload) => void;
    associateCatalogCategory: (data: CatalogCategoryAssociate) => void;
  };
}

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );

export const CatalogPage = ({ data, actions }: Props) => {
  const { categories, items, loading, showcaseId } = data;
  const { createCatalogCategory, associateCatalogCategory } = actions;
  const [tab, setTab] = useState(0);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  return (
    <>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          paddingInline={2}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Catálogo
          </Typography>
          {tab === 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsCategoryModalOpen(true)}
              startIcon={<IconPlus size={20} />}
            >
              Nova Categoria
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsItemModalOpen(true)}
              startIcon={<IconPlus size={20} />}
            >
              Novo Item
            </Button>
          )}
        </Box>

        <Box paddingInline={2}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              icon={<IconTag size={18} />}
              iconPosition="start"
              label="Categorias"
            />
            <Tab
              icon={<IconPackage size={18} />}
              iconPosition="start"
              label="Itens"
            />
          </Tabs>

          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {tab === 0 && (
                <Box>
                  {!categories || categories.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                      Nenhuma categoria encontrada.
                    </Typography>
                  ) : (
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {categories.map((category) => (
                        <Chip
                          key={category._id}
                          label={category.name}
                          icon={<IconTag size={16} />}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              {tab === 1 && (
                <Box>
                  {!items || items.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                      Nenhum item encontrado.
                    </Typography>
                  ) : (
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Preço base</TableCell>
                            <TableCell>Descrição</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {items.map((item) => {
                            const category = categories?.find(
                              (c) => c._id === item.categoryId,
                            );
                            return (
                              <TableRow key={item._id}>
                                <TableCell>
                                  {item?.image ? (
                                    <img
                                      src={`${ASSETS_BASE_URL}${item.image}`}
                                      alt={`imagem do item: ${item.title}`}
                                      width={60}
                                      height={60}
                                    />
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Sem imagem
                                    </Typography>
                                  )}
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                  {category ? (
                                    <Chip
                                      label={category.name}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      —
                                    </Typography>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {item.pricing?.basePriceInCents != null
                                    ? formatPrice(item.pricing.basePriceInCents)
                                    : "—"}
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                    sx={{ maxWidth: 200 }}
                                  >
                                    {item.description || "—"}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <ModalComponent
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        content={
          <CreateCatalogCategory
            actions={{
              onClose: () => setIsCategoryModalOpen(false),
              createCatalogCategory,
              associateCatalogCategory,
            }}
          />
        }
        maxWidth={500}
      />

      <ModalComponent
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        content={
          <CreateCatalogItem
            data={{ showcaseId, categories: categories ?? [] }}
            actions={{ onClose: () => setIsItemModalOpen(false) }}
          />
        }
        maxWidth={500}
      />
    </>
  );
};
