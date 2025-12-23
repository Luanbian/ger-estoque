import { Product } from "../../../../features/products/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { ProductRow } from "./item";
import { Category } from "../../../../features/categories/types";

interface Props {
  data: {
    products: Product[];
    categories: Category[];
  };
}

export const ProductGridList = ({ data }: Props) => {
  const { products, categories } = data;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: 1, borderColor: "divider" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 50 }} />
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                PRODUTO
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                TIPO
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                CATEGORIA
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                ESTOQUE
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                MÍN.
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                STATUS
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                AÇÕES
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product._id}
              data={{
                product,
                categories,
                category: categories.find(
                  (cat) => cat._id === product.categoryId
                ),
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
