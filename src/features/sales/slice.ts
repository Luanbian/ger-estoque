import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateSalePayload, Sales, SalesState } from "./types";
import { Pagination, PaginationRequest } from "../common/types";

export const initialState: SalesState = {
  data: null,
  loading: false,
  error: null,
  pagination: null,
  maxSalesInvoicing: null,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    salesRequest: (
      _state,
      _action: PayloadAction<PaginationRequest | undefined>,
    ) => {},
    createSaleRequest: (
      _state,
      _action: PayloadAction<CreateSalePayload>,
    ) => {},
    getMaxSalesInvoicingRequest: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSales: (state, action: PayloadAction<Sales[]>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pagination | null>) => {
      state.pagination = action.payload;
    },
    setMaxSalesInvoicing: (state, action: PayloadAction<number | null>) => {
      state.maxSalesInvoicing = action.payload;
    },
    addSale: (state, action: PayloadAction<Sales>) => {
      if (state.data) {
        state.data = [...state.data, action.payload];
      } else {
        state.data = [action.payload];
      }
    },
  },
});

export const { actions } = salesSlice;
export default salesSlice.actions;
