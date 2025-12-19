import { Product } from "../../../../features/products/types";
import { ProductGridItem } from "./item";

interface Props {
  data: Product[];
}

export const ProductGridList = ({ data }: Props) => {
  return (
    <div>
      Lista em grade de produtos
      {data.map((product) => (
        <div key={product._id}>
          <ProductGridItem data={product} />
        </div>
      ))}
    </div>
  );
};
