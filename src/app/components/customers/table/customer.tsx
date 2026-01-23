import { TableCell, TableRow, Typography } from "@mui/material";
import { Customer } from "../../../../features/customers/types";

interface Props {
  data: {
    customer: Customer;
  };
}

export const CustomerRow = ({ data }: Props) => {
  const { customer } = data;

  return (
    <TableRow key={customer._id} hover>
      <TableCell
        sx={{
          maxWidth: 200,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {customer._id}
      </TableCell>
      <TableCell>
        <Typography variant="body2">{customer.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{customer.phone}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{customer.invoicing}</Typography>
      </TableCell>
    </TableRow>
  );
};
