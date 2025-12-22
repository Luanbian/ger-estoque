import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "../../../../features/products/types";
import { getStatusChip } from "../../../../utils/getStockStatus";
import { Category } from "../../../../features/categories/types";

interface Props {
  data: {
    variant: Product;
    category?: Category;
  };
}

export const ProductVariantItem = ({ data }: Props) => {
  const { variant, category } = data;
  const { label, color } = getStatusChip(variant.stockStatus);

  return (
    <TableRow key={variant._id} hover>
      <TableCell sx={{ width: "23%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "action.disabled",
            }}
          />
          <Typography variant="body2">{variant.name}</Typography>
        </Box>
      </TableCell>
      <TableCell align="left" sx={{ width: "18%" }}>
        <Typography variant="body2" color="text.secondary">
          {variant.type}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ width: "19%" }}>
        <Typography variant="body2" fontWeight={500}>
          {category ? category.name : "Sem categoria"}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ width: "16%" }}>
        <Typography variant="body2" color="text.secondary">
          {variant.stock}
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ width: "6%" }}>
        <Typography variant="body2" fontWeight={500}>
          {variant.minStock}
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ width: "23%" }}>
        <Chip label={label} color={color} size="small" />
      </TableCell>
    </TableRow>
  );
};
