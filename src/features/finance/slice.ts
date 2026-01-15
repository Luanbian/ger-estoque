import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FinanceDashboardResponse, FinanceState } from "./types";

export const initialState: FinanceState = {
  data: {
    stock: null,
    perProduct: [],
    aggregate: null,
  },
  loading: false,
  error: null,
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    financialDashboardRequest: () => {},
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFinanceData: (
      state,
      action: PayloadAction<FinanceDashboardResponse>
    ) => {
      state.data = {
        perProduct: action.payload.perProduct.data,
        stock: action.payload.stock.data,
        aggregate: action.payload.aggregate.data,
      };
      state.error = null;
    },
  },
});

export const { actions } = financeSlice;
export default financeSlice.actions;
