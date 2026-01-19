import Async from "react-select/async";
import { ActionMeta, MultiValue } from "react-select";
import { useEffect, useState } from "react";
import { apiService } from "../../../services/api";
import { Product } from "../../../features/products/types";
import { useTheme } from "@mui/material/styles";

export interface Option {
  label: string;
  value: string | number;
}

interface LoadItemResponse {
  data: Product[];
}

interface Props {
  data: {
    endpoint?: string;
    defaultValue?: Option[];
  };
  actions: {
    onChange: (
      value: MultiValue<Option>,
      actionMeta: ActionMeta<Option>,
    ) => void;
  };
}

export const AsyncSelect = ({ data, actions }: Props) => {
  const { endpoint, defaultValue } = data;
  const { onChange } = actions;

  const theme = useTheme();

  const [orderValues, setOrderValues] = useState<Option[] | null>(
    defaultValue ?? null,
  );

  const fetchOptions = async (inputValue: string): Promise<Option[]> => {
    if (inputValue.length < 3 || !endpoint) return [];

    try {
      const result: LoadItemResponse = await apiService.get(endpoint, {
        search: inputValue,
      });

      const { data } = result;

      return data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
    } catch (error) {
      return [];
    }
  };

  const loadOptions = (inputValue: string) => {
    return fetchOptions(inputValue);
  };

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0)
      setOrderValues(
        [...defaultValue].sort((a, b) => a.label.localeCompare(b.label)),
      );
    else setOrderValues(null);
  }, [defaultValue]);

  const handleChange = (
    value: MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    setOrderValues(value as Option[] | null);
    onChange(value, actionMeta);
  };

  return (
    <Async
      onChange={handleChange}
      value={orderValues}
      isMulti
      loadOptions={endpoint ? loadOptions : undefined}
      isClearable
      cacheOptions={false}
      defaultOptions={false}
      styles={{
        control: (base, state) => ({
          ...base,
          minWidth: "240px",
          maxHeight: "200px",
          overflow: "auto",
          borderColor: state.isFocused
            ? theme.palette.primary.main
            : theme.palette.grey[200],
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.primary.main,
          "&:hover": { borderColor: theme.palette.primary.main },
        }),
        menu: (base) => ({
          ...base,
          zIndex: 1000,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: theme.palette.action.selected,
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: theme.palette.text.primary,
        }),
        option: (base, state) => ({
          ...base,
          color: theme.palette.text.primary,
          backgroundColor: state.isFocused
            ? theme.palette.action.hover
            : "transparent",
          "&:hover": { backgroundColor: theme.palette.action.hover },
        }),
        input: (base) => ({
          ...base,
          color: theme.palette.text.primary,
        }),
      }}
    />
  );
};
