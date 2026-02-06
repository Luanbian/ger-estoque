import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCustomerPayload, Customer, CustomerState } from "./types";
import { PaginationRequest } from "../common/types";

const initialState: CustomerState = {
  data: null,
  favorites: null,
  loading: false,
  loadingFavorites: false,
  error: null,
  pagination: null,
  paginationFavorites: null,
  maxSpent: null,
  maxSpentFavorites: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customersRequest: (
      _state,
      _action: PayloadAction<PaginationRequest | undefined>,
    ) => {},
    favoritesRequest: (
      _state,
      _action: PayloadAction<PaginationRequest | undefined>,
    ) => {},
    createCustomerRequest: (
      _state,
      _action: PayloadAction<CreateCustomerPayload>,
    ) => {},
    updateIsFavoriteRequest: (_state, _action: PayloadAction<string>) => {},
    getCustomerMaxSpentRequest: () => {},
    getFavoriteMaxSpentRequest: () => {},
    setCustomers: (state, action) => {
      state.data = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingFavorites: (state, action) => {
      state.loadingFavorites = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setPaginationFavorites: (state, action) => {
      state.paginationFavorites = action.payload;
    },
    setMaxSpent: (state, action) => {
      state.maxSpent = action.payload;
    },
    setMaxSpentFavorites: (state, action) => {
      state.maxSpentFavorites = action.payload;
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
