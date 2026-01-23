import { InputAdornment, OutlinedInput, Paper } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { FilterCategory } from "../../../../features/filters/types";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { actions as categoryActions } from "../../../../features/categories";
import actions from "../../../../features/filters/slice";

interface Props {
  data: {
    category: FilterCategory;
  };
  actions: {
    onChangeName: (name: string) => void;
  };
}

const CategoryFiltersComponent = ({ data, actions }: Props) => {
  const { category } = data;
  const { onChangeName } = actions;

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <OutlinedInput
        placeholder="Pesquisar produto..."
        size="small"
        type="search"
        notched
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <IconSearch size={20} />
          </InputAdornment>
        }
        value={category.name || ""}
        onChange={(e) => {
          onChangeName(e.target.value || "");
        }}
        sx={{ bgcolor: "background.paper" }}
      />
    </Paper>
  );
};

export const CategoryFilters = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.filter);

  const onChangeName = (name: string) => {
    dispatch(actions.setCategoryName(name));
    dispatch(categoryActions.categoryTreeRequest());
  };

  return (
    <CategoryFiltersComponent data={{ category }} actions={{ onChangeName }} />
  );
};
