import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "../../../../features/products/types";
import { formatPrice } from "../../../../utils/formatPrice";
import { getStatusChip } from "../../../../utils/getStockStatus";

interface Props {
  variant: Product;
  open: boolean;
}

export const ProductVariantItem = ({ variant }: Props) => {
  const { label, color } = getStatusChip(variant.stockStatus);

  return (
    <TableRow key={variant._id} hover>
      <TableCell sx={{ pl: 4, width: "40%" }}>
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
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {variant.sku}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" fontWeight={500}>
          {variant.stock}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" color="text.secondary">
          {variant.minStock}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={500}>
          {formatPrice(variant.unitPrice)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip label={label} color={color} size="small" />
      </TableCell>
    </TableRow>
  );
};
