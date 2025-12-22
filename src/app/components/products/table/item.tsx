import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../../../features/products/types";
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

interface Props {
  data: {
    product: Product;
    category?: Category;
    categories?: Category[];
  };
}

export const ProductRow = ({ data }: Props) => {
  const { product, category, categories } = data;
  const [open, setOpen] = useState(false);
  const hasVariants =
    product.hasVariants && product.variants && product.variants.length > 0;
  const { label, color } = getStatusChip(product.stockStatus);

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
      </TableRow>

      {hasVariants && (
        <ProductVariantGridList data={{ product, open, categories }} />
      )}
    </>
  );
};
