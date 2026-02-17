import { OrderStatus } from "../common/orderStatusEnum";
import { Pagination } from "../common/types";

export interface Order {
  _id: string;
  tenantId: string;
  domain: string;
  status: OrderStatus;
  items: {
    productId: string;
    nameSnapshot: string;
    quantity: number;
    priceSnapshot: number;
  }[];
  totalAmount: number;
  customer: {
    name: string;
    email: string | null;
    phone: string;
  };
  decidedAt: string | null;
}

export interface OrderState {
  data: Order[] | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
}

export interface UpdateOrderStatusPayload {
  orderId: string;
  status: string;
}
