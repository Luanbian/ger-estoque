import { Box } from "@mui/material";
import { SliderComponent } from "../../slider";
import { useDispatch } from "../../../../store/hooks";
import { actions as filterActions } from "../../../../features/filters";
import { actions } from "../../../../features/sales";

interface Props {
  data: {
    salePrice: {
      min: number;
      max: number;
    };
  };
  actions: {
    changeSalePrice: (min: number, max: number) => void;
  };
}

const SalesFiltersComponent = ({ data, actions }: Props) => {
  const { salePrice } = data;
  const { changeSalePrice } = actions;

  return (
    <Box>
      <SliderComponent
        data={salePrice}
        actions={{ afterChange: changeSalePrice }}
      />
    </Box>
  );
};

export const SalesFilters = () => {
  const dispatch = useDispatch();

  const maxSalePrice = 100_000;

  const changeSalePrice = (min: number, max: number) => {
    dispatch(filterActions.setSalesPrice({ min, max }));
    dispatch(actions.salesRequest());
  };

  return (
    <SalesFiltersComponent
      data={{ salePrice: { min: 0, max: maxSalePrice } }}
      actions={{ changeSalePrice }}
    />
  );
};
