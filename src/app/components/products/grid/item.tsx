import { Product } from "../../../../features/products/types";

interface Props {
  data: Product;
}

export const ProductGridItem = ({ data }: Props) => {
  return <div>Item de grade de produto: {data.name}</div>;
};
