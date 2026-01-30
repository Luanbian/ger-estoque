import { CustomerStatusEnum } from "../features/common/customerStatusEnum";
import { StockStatusEnum } from "../features/common/stockStatusEnum";

export const getStatusChip = (
  status: StockStatusEnum | CustomerStatusEnum,
): { label: string; color: "success" | "warning" | "error" | "default" } => {
  let statusConfig: Record<
    any,
    { label: string; color: "success" | "warning" | "error" | "default" }
  > | null = null;

  if (Object.values(StockStatusEnum).includes(status as StockStatusEnum)) {
    statusConfig = {
      [StockStatusEnum.ALL]: { label: "Todos", color: "default" },
      [StockStatusEnum.OK]: { label: "OK", color: "success" },
      [StockStatusEnum.LOW_STOCK]: { label: "Baixo", color: "warning" },
      [StockStatusEnum.OUT_OF_STOCK]: { label: "Esgotado", color: "error" },
      [StockStatusEnum.UNKNOWN]: { label: "Desconhecido", color: "default" },
    };
  }

  if (
    Object.values(CustomerStatusEnum).includes(status as CustomerStatusEnum)
  ) {
    statusConfig = {
      [CustomerStatusEnum.NEW]: { label: "Novo", color: "default" },
      [CustomerStatusEnum.ACTIVE]: { label: "Ativo", color: "success" },
      [CustomerStatusEnum.INACTIVE]: { label: "Inativo", color: "warning" },
      [CustomerStatusEnum.VIP]: { label: "VIP", color: "error" },
    };
  }

  const config = statusConfig![status] || {
    label: status,
    color: "default" as const,
  };

  return config;
};
