import { TableCell, TableRow, Typography } from "@mui/material";
import { convertFromCents } from "../../../../utils/convertTocents";
import { formatDate } from "../../../../utils/formatDate";
import { Sales } from "../../../../features/sales/types";

interface Props {
  data: {
    sale: Sales;
  };
}
export const SaleRow = ({ data }: Props) => {
  const { sale } = data;

  return (
    <TableRow key={sale._id} hover>
      <TableCell
        sx={{
          maxWidth: 200,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {sale._id}
      </TableCell>
      <TableCell>
        <Typography variant="body2">{sale.name}</Typography>
      </TableCell>
      <TableCell>{convertFromCents(sale.totals.salePrice)}</TableCell>
      <TableCell>{convertFromCents(sale.totals.costPrice)}</TableCell>
      <TableCell>{formatDate(sale.createdAt)}</TableCell>
    </TableRow>
  );
};
