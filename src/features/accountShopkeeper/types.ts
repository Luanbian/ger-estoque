import { SubscriptionBillingStatus } from "../common/billingStatusEnum";

export interface AccountShopkeeper {
  auth: {
    email: string;
    profileId: string;
  };
  accountShopkeeper: {
    name: string;
    cnpj: string;
    avatar?: string;
  };
  subscription: {
    planTypeId: string;
    billingStatus: SubscriptionBillingStatus;
    card: {
      brand: string;
      digits: string;
      id: string;
    };
    expiresAt: string;
  };
}

export interface AccountShopkeeperState {
  data: AccountShopkeeper | null;
  loading: boolean;
  error: string | null;
  responseMessage?: string;
}

export interface CreateAccountShopkeeperPayload {
  name: string;
  cnpj: string;
  auth: {
    email: string;
    password: string;
  };
  subscription: {
    planTypeId: string;
    billingStatus: SubscriptionBillingStatus;
  };
}
