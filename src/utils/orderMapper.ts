import { OrderStatus } from "../features/common/orderStatusEnum";

export const orderMapper: Record<OrderStatus, string> = {
  [OrderStatus.ALL]: "Todos",
  [OrderStatus.PENDING]: "Pendente",
  [OrderStatus.ACCEPTED]: "Aceito",
  [OrderStatus.REJECTED]: "Rejeitado",
};
