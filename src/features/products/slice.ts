import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateProductPayload,
  Product,
  ProductState,
  RequestProduct,
  RegisterSteps,
} from "./types.ts";

export const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
  registerSteps: {
    status: "identification",
    steps: {
      identification: false,
      category: false,
      variant: false,
      stock: false,
      price: false,
    },
  },
  registerForm: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequest: (_state, _action: PayloadAction<RequestProduct>) => {},
    createProductRequest: (
      _state,
      _action: PayloadAction<CreateProductPayload>
    ) => {},
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
    addProduct: (state, action: PayloadAction<Product>) => {
      state.data?.push(action.payload);
    },
    setRegisterSteps: (state, action: PayloadAction<RegisterSteps>) => {
      state.registerSteps = {
        ...state.registerSteps,
        ...action.payload,
      };
    },
    setRegisterForm: (
      state,
      action: PayloadAction<Partial<CreateProductPayload> | null>
    ) => {
      state.registerForm = {
        ...state.registerForm,
        ...action.payload,
      };
    },
    resetRegister: (state) => {
      state.registerForm = null;
      state.registerSteps = initialState.registerSteps;
    },
  },
});

export const { actions } = productSlice;
export default productSlice.actions;
