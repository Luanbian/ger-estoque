import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePaymentPayload, Payment, PaymentState } from "./types";

const initialState: PaymentState = {
  data: null,
  loading: false,
  error: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    createCheckoutRequest: (
      _state,
      _action: PayloadAction<CreatePaymentPayload>,
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPayment: (state, action: PayloadAction<Payment>) => {
      state.data = action.payload;
    },
  },
});

export const { actions } = paymentSlice;
export default paymentSlice.actions;
