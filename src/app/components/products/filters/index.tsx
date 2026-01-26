import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { AsyncSelect, Option } from "../../asyncSelect";
import { IconSearch } from "@tabler/icons-react";
import { ProductType } from "../../../../features/common/productTypeEnum";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { UnitOfMeasure } from "../../../../features/unitOfMeasure/types";
import { stockMapper } from "../../../../utils/stockMapper";
import { ProductFilters } from "../../../../features/filters/types";
import { actions } from "../../../../features/filters";
import { actions as productActions } from "../../../../features/products";
import { StockStatusEnum } from "../../../../features/common/stockStatusEnum";

interface Props {
  data: {
    unitOfMeasures: UnitOfMeasure[];
    product: ProductFilters;
  };
  actions: {
    onChangeName: (name: string) => void;
    onChangeCategoryId: (options: Option[]) => void;
    onChangeUnitOfMeasureId: (value: string) => void;
    onChangeType: (type: ProductType) => void;
    onChangeStockStatus: (stockStatus: StockStatusEnum) => void;
  };
}

const ProductFiltersComponent = ({ data, actions }: Props) => {
  const { unitOfMeasures, product } = data;
  const {
    onChangeName,
    onChangeCategoryId,
    onChangeUnitOfMeasureId,
    onChangeType,
    onChangeStockStatus,
  } = actions;

  const handleStockChange = (_: any, newValue: string | null) => {
    onChangeStockStatus((newValue || "") as StockStatusEnum);
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
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
            value={product.name || ""}
            onChange={(e) => {
              onChangeName(e.target.value || "");
            }}
            sx={{ bgcolor: "background.paper" }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ width: "100%" }}>
            <AsyncSelect
              data={{ endpoint: "/category" }}
              actions={{
                onChange: (value) => onChangeCategoryId(value as Option[]),
              }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <Typography variant="caption" sx={{ mb: 0.5 }}>
              Unidade de Medida
            </Typography>
            <Select
              displayEmpty
              value={product.unitOfMeasureId || ""}
              onChange={(e) => {
                onChangeUnitOfMeasureId(e.target.value as string);
              }}
            >
              <MenuItem value="">
                <em>Selecione</em>
              </MenuItem>
              {unitOfMeasures.length === 0 ? (
                <MenuItem disabled>Nenhuma unidade disponível</MenuItem>
              ) : (
                unitOfMeasures.map((unit) => (
                  <MenuItem key={unit._id} value={unit._id}>
                    {unit.name} ({unit.abbreviation})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <Typography variant="caption" sx={{ mb: 0.5 }}>
              Tipo de Produto
            </Typography>
            <Select
              displayEmpty
              value={product.type || ""}
              onChange={(e) => onChangeType(e.target.value as ProductType)}
            >
              <MenuItem value="">
                <em>Selecione</em>
              </MenuItem>
              <MenuItem value={ProductType.FINAL}>Produto Final</MenuItem>
              <MenuItem value={ProductType.RAW_MATERIAL}>
                Matéria-prima
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
            Status de Estoque
          </Typography>
          <ToggleButtonGroup
            value={product.stockStatus || ""}
            exclusive
            onChange={handleStockChange}
            sx={{ flexWrap: "wrap", gap: 1 }}
            size="small"
          >
            {Object.entries(stockMapper).map(([key, value]) => (
              <ToggleButton key={key} value={key}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                onChangeName("");
                onChangeCategoryId([]);
                onChangeUnitOfMeasureId("");
                onChangeType("" as ProductType);
                onChangeStockStatus("" as StockStatusEnum);
              }}
            >
              Limpar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const ProductFilter = () => {
  const dispatch = useDispatch();
  const { data: unitOfMeasures } = useSelector((state) => state.unitOfMeasure);
  const { product } = useSelector((state) => state.filter);

  const onChangeName = (name: string) => {
    dispatch(actions.setProductName(name));
    dispatch(productActions.productTreeRequest());
  };
  const onChangeCategoryId = (options: Option[]) => {
    const categoryId = options.length > 0 ? (options[0].value as string) : "";
    dispatch(actions.setProductCategoryId(categoryId));
    dispatch(productActions.productTreeRequest());
  };
  const onChangeUnitOfMeasureId = (unitOfMeasureId: string) => {
    dispatch(actions.setProductUnitOfMeasureId(unitOfMeasureId));
    dispatch(productActions.productTreeRequest());
  };
  const onChangeType = (type: ProductType) => {
    dispatch(actions.setProductType(type));
    dispatch(productActions.productTreeRequest());
  };
  const onChangeStockStatus = (stockStatus: StockStatusEnum) => {
    dispatch(actions.setProductStockStatus(stockStatus));
    dispatch(productActions.productTreeRequest());
  };

  if (!unitOfMeasures) {
    return <div>Carregando unidades de medida...</div>;
  }

  return (
    <ProductFiltersComponent
      data={{ unitOfMeasures, product }}
      actions={{
        onChangeName,
        onChangeCategoryId,
        onChangeUnitOfMeasureId,
        onChangeType,
        onChangeStockStatus,
      }}
    />
  );
};
