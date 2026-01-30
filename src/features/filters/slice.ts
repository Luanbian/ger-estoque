import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../common/productTypeEnum";
import { StockStatusEnum } from "../common/stockStatusEnum";
import { Filters } from "./types";
import { CustomerStatusEnum } from "../common/customerStatusEnum";

const initialState: Filters = {
  product: {},
  category: {},
  sales: {},
  customer: {},
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
    setSalesPrice: (
      state,
      action: PayloadAction<{ min?: number; max?: number }>,
    ) => {
      state.sales.salePriceMin = action.payload.min;
      state.sales.salePriceMax = action.payload.max;
    },
    setCustomerName: (state, action: PayloadAction<string>) => {
      state.customer.name = action.payload;
    },
    setCustomerPhone: (state, action: PayloadAction<string>) => {
      state.customer.phone = action.payload;
    },
    setCustomerInvoicing: (
      state,
      action: PayloadAction<{ min?: number; max?: number }>,
    ) => {
      state.customer.invoicingMin = action.payload.min;
      state.customer.invoicingMax = action.payload.max;
    },
    setCustomerStatus: (state, action: PayloadAction<CustomerStatusEnum>) => {
      state.customer.status = action.payload;
    },
  },
});

export const { actions } = filterSlice;
export default filterSlice.actions;
