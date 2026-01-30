import { useState } from "react";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Customer } from "../../../../features/customers/types";
import { useDispatch } from "../../../../store/hooks";
import { actions as customerActions } from "../../../../features/customers";

interface Props {
  data: {
    customer: Customer;
  };
  actions: {
    updateIsFavorite: (customerId: string) => void;
  };
}
const CustomerRowComponent = ({ data, actions }: Props) => {
  const { customer } = data;
  const { updateIsFavorite } = actions;

  const [isFavorite, setIsFavorite] = useState(customer.isFavorite || false);

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
      <TableCell>
        <IconButton
          onClick={() => {
            setIsFavorite(!isFavorite);
            updateIsFavorite(customer._id);
          }}
        >
          {isFavorite ? <IconStarFilled color="yellow" /> : <IconStar />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

interface CustomerRowProps {
  data: {
    customer: Customer;
  };
}

export const CustomerRow = ({ data }: CustomerRowProps) => {
  const dispatch = useDispatch();
  const { customer } = data;

  const updateIsFavorite = (customerId: string) => {
    dispatch(customerActions.updateIsFavoriteRequest(customerId));
  };

  return (
    <CustomerRowComponent data={{ customer }} actions={{ updateIsFavorite }} />
  );
};
