import { CustomerStatusEnum } from "../features/common/customerStatusEnum";

export const customerMapper: Record<CustomerStatusEnum, string> = {
  [CustomerStatusEnum.ALL]: "Todos",
  [CustomerStatusEnum.NEW]: "Novo",
  [CustomerStatusEnum.ACTIVE]: "Ativo",
  [CustomerStatusEnum.INACTIVE]: "Inativo",
  [CustomerStatusEnum.VIP]: "VIP",
};
