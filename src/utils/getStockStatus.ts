import { StockStatusEnum } from "../features/common/stockStatusEnum";

export const getStatusChip = (
  status: StockStatusEnum
): { label: string; color: "success" | "warning" | "error" | "default" } => {
  const statusConfig: Record<
    StockStatusEnum,
    { label: string; color: "success" | "warning" | "error" | "default" }
  > = {
    [StockStatusEnum.OK]: { label: "OK", color: "success" },
    [StockStatusEnum.LOW_STOCK]: { label: "Baixo", color: "warning" },
    [StockStatusEnum.OUT_OF_STOCK]: { label: "Esgotado", color: "error" },
  };

  const config = statusConfig[status] || {
    label: status,
    color: "default" as const,
  };
  return config;
};
