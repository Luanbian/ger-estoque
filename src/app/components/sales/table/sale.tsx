import { TableCell, TableRow, Typography } from "@mui/material";
import { convertFromCents } from "../../../../utils/convertTocents";
import { formatDate } from "../../../../utils/formatDate";
import { Sales } from "../../../../features/sales/types";
import { formatSaleName } from "../../../../utils/formatSaleName";

interface Props {
  data: {
    sale: Sales;
  };
}
export const SaleRow = ({ data }: Props) => {
  const { sale } = data;

  const calcQuantity = () => {
    return Object.values(sale.products).reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    );
  };

  const calcSalePrice = () => {
    return Object.values(sale.products).reduce(
      (acc, curr) => acc + curr.salePrice * curr.quantity,
      0,
    );
  };

  const calcCostPrice = () => {
    return Object.values(sale.products).reduce(
      (acc, curr) => acc + curr.costPrice * curr.quantity,
      0,
    );
  };

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
        <Typography variant="body2">
          {formatSaleName(Object.keys(sale.products))}
        </Typography>
      </TableCell>
      <TableCell>{calcQuantity()}</TableCell>
      <TableCell>{convertFromCents(calcSalePrice())}</TableCell>
      <TableCell>{convertFromCents(calcCostPrice())}</TableCell>
      <TableCell>{formatDate(sale.createdAt)}</TableCell>
    </TableRow>
  );
};
