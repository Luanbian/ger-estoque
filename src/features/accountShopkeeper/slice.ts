import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountShopkeeperState,
  CreateAccountShopkeeperPayload,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAccountShopkeeper: (
      state,
      action: PayloadAction<Pick<AccountShopkeeperState, "data">>
    ) => {
      state.data = action.payload.data;
    },
  },
});

export const { actions } = accountShopkeeperSlice;
export default accountShopkeeperSlice.actions;
