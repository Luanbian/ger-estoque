import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Category } from "../../../../features/categories/types";
import { CategoryRow } from "./category";

interface Props {
  data: Category[];
}

export const CategoryGridList = ({ data }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={50} />
            <TableCell>Nome</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell align="center">Ordem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((category) => (
            <CategoryRow key={category._id} category={category} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
