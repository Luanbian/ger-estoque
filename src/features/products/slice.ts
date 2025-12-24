import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductPayload,
  Product,
  ProductState,
  RequestProduct,
  RegisterSteps,
  CreateProductWithVariantPayload,
  AddVariantPayload,
  UpdateVariantPayload,
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
    updateVariantRequest: (
      _state,
      _action: PayloadAction<UpdateVariantPayload>
    ) => {},
    deleteProductRequest: (_state, _action: PayloadAction<string>) => {},
    deleteVariantRequest: (
      _state,
      _action: PayloadAction<{ productId: string; variantId: string }>
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
      if (!state.data![index].hasVariants) {
        state.data![index].hasVariants = true;
      }
      state.error = null;
    },
    setOneVariant: (state, action: PayloadAction<Product>) => {
      const productIndex = state.data!.findIndex(
        (product) => product._id === action.payload.parentProductId
      );
      if (state.data![productIndex].variants) {
        const variantIndex = state.data![productIndex].variants!.findIndex(
          (variant) => variant._id === action.payload._id
        );
        state.data![productIndex].variants![variantIndex] = action.payload;
      }
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
    removeProduct: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data = state.data?.filter(
          (product) => product._id !== action.payload
        );
      }
    },
    removeVariant: (
      state,
      action: PayloadAction<{ productId: string; variantId: string }>
    ) => {
      if (state.data) {
        const productIndex = state.data.findIndex(
          (product) => product._id === action.payload.productId
        );
        state.data[productIndex].variants = state.data[
          productIndex
        ].variants!.filter(
          (variant) => variant._id !== action.payload.variantId
        );
        if (state.data[productIndex].variants!.length === 0) {
          state.data[productIndex].hasVariants = false;
        }
      }
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
