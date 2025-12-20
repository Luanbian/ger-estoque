import { Box, Button, Typography } from "@mui/material";
import { Category } from "../../../features/categories/types";
import { CategoryGridList } from "../../components/categories/table/list";
import { IconPlus } from "@tabler/icons-react";

interface Props {
  data: {
    categories: Category[];
  };
  actions: {
    createCategory: () => void;
  };
}
export const CategoryPage = ({ data, actions }: Props) => {
  const { categories } = data;
  const { createCategory } = actions;

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        paddingInline={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Categorias
        </Typography>
        <Button variant="contained" color="primary" onClick={createCategory}>
          <IconPlus />
        </Button>
      </Box>
      <CategoryGridList data={{ categories }} />
    </Box>
  );
};
