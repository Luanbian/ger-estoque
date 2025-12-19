import { Box, Typography } from "@mui/material";
import { Category } from "../../../features/categories/types";
import { CategoryGridList } from "../../components/categories/table/list";

interface Props {
  data: Category[];
}
export const CategoryPage = ({ data }: Props) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Categorias
      </Typography>
      <CategoryGridList data={data} />
    </Box>
  );
};
