import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ProductPayload,
  CreateProductWithVariantPayload,
  Product,
  RegisterSteps,
} from "../../../../features/products/types";
import { useState } from "react";
import {
  ChecklistRtlOutlined,
  Inventory2Outlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { getStatusChip } from "../../../../utils/getStockStatus";
import { ProductVariantGridList } from "./variantList";
import { Category } from "../../../../features/categories/types";
import { IconPencil } from "@tabler/icons-react";
import { ModalComponent } from "../../modal";
import { CreateOrUpdateProductComponent } from "../createOrUpdate/product";

interface Props {
  data: {
    product: Product;
    category?: Category;
    categories?: Category[];
    registerSteps: RegisterSteps;
    registerForm: ProductPayload | CreateProductWithVariantPayload | null;
  };
  actions: {
    onEdit: (id: string, productToUpdate: ProductPayload) => void;
  };
}

export const ProductRow = ({ data, actions }: Props) => {
  const { onEdit } = actions;
  const { product, category, categories, registerForm, registerSteps } = data;
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasVariants =
    product.hasVariants && product.variants && product.variants.length > 0;
  const { label, color } = getStatusChip(product.stockStatus);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {hasVariants && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {hasVariants ? (
              <ChecklistRtlOutlined color="action" />
            ) : (
              <Inventory2Outlined color="action" />
            )}
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {product.name}
              </Typography>
              {hasVariants && (
                <Typography variant="caption" color="text.secondary">
                  {product.variants?.length} variante(s)
                </Typography>
              )}
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {product.type}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" fontWeight={500}>
            {category ? category.name : "Sem categoria"}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" color="text.secondary">
            {product.stock}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2" fontWeight={500}>
            {product.minStock}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Chip label={label} color={color} size="small" />
        </TableCell>
        <TableCell align="center">
          {!hasVariants && (
            <IconButton
              color="primary"
              onClick={handleOpenModal}
              aria-label="edit product"
            >
              <IconPencil size={20} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {hasVariants && (
        <ProductVariantGridList data={{ product, open, categories }} />
      )}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateOrUpdateProductComponent
            data={{ product, steps: registerSteps, registerForm }}
            actions={{
              updateProduct: onEdit,
              onClose: () => setIsModalOpen(false),
            }}
          />
        }
      />
    </>
  );
};
