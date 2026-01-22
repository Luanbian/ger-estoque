import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Sales } from "../../../../features/sales/types";
import { SaleRow } from "./sale";

interface Props {
  data: {
    sales: Sales[];
  };
}

export const SaleGridList = ({ data }: Props) => {
  const { sales } = data;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Produtos</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Quantidade</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Preço venda</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Custo</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sales.map((sale) => (
          <SaleRow key={sale._id} data={{ sale }} />
        ))}
      </TableBody>
    </Table>
  );
};
