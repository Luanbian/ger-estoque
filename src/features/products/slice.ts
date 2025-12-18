import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState, RequestProduct } from "./types.ts";

export const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequest: (_state, _action: PayloadAction<RequestProduct>) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductState["data"]>) => {
      state.data = action.payload;
      state.error = null;
    },
  },
});

export const { actions } = productSlice;
export default productSlice.actions;
