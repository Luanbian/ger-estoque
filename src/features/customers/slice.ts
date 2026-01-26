import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCustomerPayload, Customer, CustomerState } from "./types";
import { PaginationRequest } from "../common/types";

const initialState: CustomerState = {
  data: null,
  loading: false,
  error: null,
  pagination: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customersRequest: (
      _state,
      _action: PayloadAction<PaginationRequest | undefined>,
    ) => {},
    createCustomerRequest: (
      _state,
      _action: PayloadAction<CreateCustomerPayload>,
    ) => {},
    setCustomers: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      if (state.data) {
        state.data.push(action.payload);
      } else {
        state.data = [action.payload];
      }
    },
  },
});

export const { actions } = customerSlice;
export default customerSlice.reducer;
