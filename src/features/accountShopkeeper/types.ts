export interface AccountShopkeeper {
  _id: string;
  name: string;
  cnpj: string;
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
}
