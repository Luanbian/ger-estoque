import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Whatsapp, WhatsappState } from "./types";

export const initialState: WhatsappState = {
  data: null,
  loading: false,
  error: null,
};

export const whatsappSlice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    whatsappRequest: () => {},
    updateWhatsappRequest: (_state, _action: PayloadAction<Whatsapp>) => {},
    createWhatsappRequest: (_state, _action: PayloadAction<Whatsapp>) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWhatsapp: (state, action: PayloadAction<Whatsapp>) => {
      state.data = action.payload;
      state.error = null;
    },
  },
});

export const { actions } = whatsappSlice;
export default whatsappSlice.actions;
