import {
  Box,
  Chip,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../../../features/products/types";
import { formatPrice } from "../../../../utils/formatPrice";
import { getStatusChip } from "../../../../utils/getStockStatus";

interface Props {
  product: Product;
  open: boolean;
}

export const ProductVariant = ({ product, open }: Props) => {
  const { label, color } = getStatusChip(product.stockStatus);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 2, ml: 6 }}>
            <Table size="small">
              <TableBody>
                {product.variants?.map((variant) => (
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
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
