import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderState } from "./types";
import { PaginationRequest } from "../common/types";
import { OrderStatus } from "../common/orderStatusEnum";

const initialState: OrderState = {
  data: null,
  loading: false,
  error: null,
  pagination: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrdersRequest: (
      _state,
      _action: PayloadAction<PaginationRequest | undefined>,
    ) => {},
    updateOrderStatusRequest: (
      _state,
      _action: PayloadAction<{
        orderId: string;
        status: OrderStatus;
      }>,
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.data = action.payload;
    },
    setPagination: (state, action: PayloadAction<OrderState["pagination"]>) => {
      state.pagination = action.payload;
    },
    setOneOrder: (state, action: PayloadAction<Order>) => {
      if (!state.data) return;
      const index = state.data.findIndex(
        (o) => o._id.toString() === action.payload._id.toString(),
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { actions } = orderSlice;
export default orderSlice.reducer;
