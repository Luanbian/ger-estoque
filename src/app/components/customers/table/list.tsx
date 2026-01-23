import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Customer } from "../../../../features/customers/types";
import { CustomerRow } from "./customer";

interface Props {
  data: {
    customers: Customer[];
  };
}

export const CustomerGridList = ({ data }: Props) => {
  const { customers } = data;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Telefone</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Faturamento</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customer) => (
          <CustomerRow key={customer._id} data={{ customer }} />
        ))}
      </TableBody>
    </Table>
  );
};
