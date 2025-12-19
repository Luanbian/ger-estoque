import { Box, Typography } from "@mui/material";
import { ProductGridList } from "../../components/products/table/list";
import { Product } from "../../../features/products/types";

interface Props {
  data: Product[];
}

export const StockPage = ({ data }: Props) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Produtos
      </Typography>
      <ProductGridList data={data} />
    </Box>
  );
};
