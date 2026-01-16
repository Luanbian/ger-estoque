import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountShopkeeperState,
  CreateAccountShopkeeperPayload,
  AccountShopkeeper,
} from "./types";

export const initialState: AccountShopkeeperState = {
  data: null,
  loading: false,
  error: null,
};

export const accountShopkeeperSlice = createSlice({
  name: "accountShopkeeper",
  initialState,
  reducers: {
    registerAccountRequest: (
      _state,
      _action: PayloadAction<CreateAccountShopkeeperPayload>
    ) => {},
    getAccountShopkeeperRequest: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAccountShopkeeper: (state, action: PayloadAction<AccountShopkeeper>) => {
      state.data = action.payload;
    },
    setResponseMessage: (state, action: PayloadAction<string | undefined>) => {
      state.responseMessage = action.payload;
    },
  },
});

export const { actions } = accountShopkeeperSlice;
export default accountShopkeeperSlice.actions;
