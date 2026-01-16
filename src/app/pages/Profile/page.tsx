import { AccountShopkeeper } from "../../../features/accountShopkeeper/types";

interface Props {
  data: {
    account: AccountShopkeeper;
  };
}

export const ProfilePage = ({ data }: Props) => {
  const { account } = data;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {account.accountShopkeeper.name}</p>
      <p>Email: {account.auth.email}</p>
      <p>CNPJ: {account.accountShopkeeper.cnpj}</p>
      <p>Subscription Plan ID: {account.subscription.planTypeId}</p>
      <p>Billing Status: {account.subscription.billingStatus}</p>
      <p>Card Brand: {account.subscription.card.brand}</p>
      <p>Card Digits: {account.subscription.card.digits}</p>
      <p>
        Subscription Expires At:{" "}
        {new Date(account.subscription.expiresAt).toLocaleDateString()}
      </p>
    </div>
  );
};
