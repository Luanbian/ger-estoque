import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../common/productTypeEnum";
import { StockStatusEnum } from "../common/stockStatusEnum";
import { Filters } from "./types";

const initialState: Filters = {
  product: {},
  category: {},
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setProductName: (state, action: PayloadAction<string>) => {
      state.product.name = action.payload;
    },
    setProductCategoryId: (state, action: PayloadAction<string>) => {
      state.product.categoryId = action.payload;
    },
    setProductUnitOfMeasureId: (state, action: PayloadAction<string>) => {
      state.product.unitOfMeasureId = action.payload;
    },
    setProductType: (state, action: PayloadAction<ProductType>) => {
      state.product.type = action.payload;
    },
    setProductStockStatus: (state, action: PayloadAction<StockStatusEnum>) => {
      state.product.stockStatus = action.payload;
    },
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.category.name = action.payload;
    },
  },
});

export const { actions } = filterSlice;
export default filterSlice.actions;
