import { TableCell, TableRow, Typography } from "@mui/material";
import { convertFromCents } from "../../../../utils/convertTocents";
import { formatDate } from "../../../../utils/formatDate";
import { Sales } from "../../../../features/sales/types";

interface Props {
  data: {
    sale: Sales;
    productName: string;
  };
}
export const SaleRow = ({ data }: Props) => {
  const { sale, productName } = data;

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
        <Typography variant="body2">{productName}</Typography>
      </TableCell>
      <TableCell>{sale.quantity}</TableCell>
      <TableCell>{convertFromCents(sale.salePrice)}</TableCell>
      <TableCell>{convertFromCents(sale.costPrice)}</TableCell>
      <TableCell>{formatDate(sale.createdAt)}</TableCell>
    </TableRow>
  );
};
