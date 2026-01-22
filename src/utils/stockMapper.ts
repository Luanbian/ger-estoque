import { StockStatusEnum } from "../features/common/stockStatusEnum";

export const stockMapper: Record<StockStatusEnum, string> = {
  [StockStatusEnum.ALL]: "Todos",
  [StockStatusEnum.OK]: "Estoque OK",
  [StockStatusEnum.LOW_STOCK]: "Estoque Baixo",
  [StockStatusEnum.OUT_OF_STOCK]: "Sem Estoque",
  [StockStatusEnum.UNKNOWN]: "Estoque Desconhecido",
};
