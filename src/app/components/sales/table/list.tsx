import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Sales } from "../../../../features/sales/types";
import { SaleRow } from "./sale";
import { Product } from "../../../../features/products/types";

interface Props {
  data: {
    sales: Sales[];
    products: Product[] | null;
  };
}

export const SaleGridList = ({ data }: Props) => {
  const { sales, products } = data;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Produto</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Quantidade</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Preço venda</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Custo</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sales.map((sale) => (
          <SaleRow
            key={sale._id}
            data={{
              sale,
              productName:
                products?.find((p) => p._id === sale.productId)?.name ||
                "Produto deletado ou inexistente",
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
};
