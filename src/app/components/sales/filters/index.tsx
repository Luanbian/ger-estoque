import { Box } from "@mui/material";
import { SliderComponent } from "../../slider";
import { useDispatch } from "../../../../store/hooks";
import { actions as filterActions } from "../../../../features/filters";
import { actions } from "../../../../features/sales";

interface Props {
  data: {
    quantity: {
      min: number;
      max: number;
    };
    salePrice: {
      min: number;
      max: number;
    };
  };
  actions: {
    changeQuantity: (min: number, max: number) => void;
    changeSalePrice: (min: number, max: number) => void;
  };
}

const SalesFiltersComponent = ({ data, actions }: Props) => {
  const { quantity, salePrice } = data;
  const { changeQuantity, changeSalePrice } = actions;

  return (
    <Box>
      <SliderComponent
        data={quantity}
        actions={{ afterChange: changeQuantity }}
      />
      <SliderComponent
        data={salePrice}
        actions={{ afterChange: changeSalePrice }}
      />
    </Box>
  );
};

export const SalesFilters = () => {
  const dispatch = useDispatch();

  const maxQuantity = 1_000;
  const maxSalePrice = 100_000;

  const changeQuantity = (min: number, max: number) => {
    dispatch(filterActions.setSalesQuantity({ min, max }));
    dispatch(actions.salesRequest({ page: "1", limit: "25", sort: "asc" }));
  };

  const changeSalePrice = (min: number, max: number) => {
    dispatch(filterActions.setSalesPrice({ min, max }));
    dispatch(actions.salesRequest({ page: "1", limit: "25", sort: "asc" }));
  };

  return (
    <SalesFiltersComponent
      data={{
        quantity: { min: 0, max: maxQuantity },
        salePrice: { min: 0, max: maxSalePrice },
      }}
      actions={{
        changeQuantity,
        changeSalePrice,
      }}
    />
  );
};
