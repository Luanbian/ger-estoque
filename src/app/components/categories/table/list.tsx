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
  data: {
    categories: Category[];
  };
}

export const CategoryGridList = ({ data }: Props) => {
  const { categories } = data;

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
          {categories.map((category) => (
            <CategoryRow key={category._id} data={{ category }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
