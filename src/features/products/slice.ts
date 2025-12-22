import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductPayload,
  Product,
  ProductState,
  RequestProduct,
  RegisterSteps,
  CreateProductWithVariantPayload,
  AddVariantPayload,
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
      _action: PayloadAction<ProductPayload>
    ) => {},
    createProductWithVariantRequest: (
      _state,
      _action: PayloadAction<CreateProductWithVariantPayload>
    ) => {},
    updateProductRequest: (
      _state,
      _action: PayloadAction<{ id: string; data: ProductPayload }>
    ) => {},
    addVariantToProductRequest: (
      _state,
      _action: PayloadAction<{
        id: string;
        data: AddVariantPayload[];
      }>
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
    setOneProduct: (state, action: PayloadAction<Product>) => {
      if (state.data) {
        const index = state.data.findIndex(
          (product) => product._id === action.payload._id
        );
        state.data[index] = action.payload;
      } else {
        state.data = [action.payload];
      }
      state.error = null;
    },
    addVariant: (
      state,
      action: PayloadAction<{ id: string; data: Product }>
    ) => {
      const index = state.data!.findIndex(
        (product) => product._id === action.payload.id
      );
      if (!state.data![index].variants) {
        state.data![index].variants = [];
      }
      state.data![index].variants?.push(action.payload.data);
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
      action: PayloadAction<CreateProductWithVariantPayload | ProductPayload>
    ) => {
      state.registerForm = action.payload;
    },
    resetRegister: (state) => {
      state.registerForm = null;
      state.registerSteps = initialState.registerSteps;
    },
  },
});

export const { actions } = productSlice;
export default productSlice.actions;
