import { Box, Typography } from "@mui/material";
import { Category } from "../../../features/categories/types";

interface Props {
  data: Category[];
}
export const CategoryPage = ({ data }: Props) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Categorias
      </Typography>
      {data.map((category) => (
        <Typography key={category._id} variant="h6" component="h2">
          {category.name}
        </Typography>
      ))}
    </Box>
  );
};
