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

interface Props {
  data: Product[];
}

export const ProductGridList = ({ data }: Props) => {
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
                SKU
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                ESTOQUE
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                MÍN.
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight={600}>
                PREÇO
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                STATUS
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <ProductRow key={product._id} product={product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
