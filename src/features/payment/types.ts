import { CustomerType } from "../common/customerTypeEnum";

export interface Payment {
  checkoutLink: string | null;
}

export interface PaymentState {
  data: Payment | null;
  loading: boolean;
  error: string | null;
}

export interface CreatePaymentPayload {
  planId: string;
  customerData: {
    name: string;
    email: string;
    type: CustomerType;
    document: string;
  };
}

export interface PaymentResponse {
  checkoutLink: string;
}
