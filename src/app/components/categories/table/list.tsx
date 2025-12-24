import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                NOME
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                SLUG
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                DESCRIÇÃO
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                ORDEM
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                AÇÕES
              </Typography>
            </TableCell>
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
