import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Product } from "../../../../features/products/types";
import { ProductVariantItem } from "./variantItem";

interface Props {
  product: Product;
  open: boolean;
}

export const ProductVariantGridList = ({ product, open }: Props) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 2, ml: 6 }}>
            <Table size="small">
              <TableBody>
                {product.variants?.map((variant) => (
                  <ProductVariantItem
                    key={variant._id}
                    variant={variant}
                    open={open}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
