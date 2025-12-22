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
import { Category } from "../../../../features/categories/types";

interface Props {
  data: { product: Product; open: boolean; categories?: Category[] };
}

export const ProductVariantGridList = ({ data }: Props) => {
  const { product, open, categories } = data;
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
                    data={{
                      variant,
                      category: categories?.find(
                        (cat) => cat._id === variant.categoryId
                      ),
                    }}
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
