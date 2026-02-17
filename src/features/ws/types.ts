export interface WebSocketState {
  notifications: WebSocketEvent[];
  isConnected: boolean;
  error: string | null;
}

export interface WebSocketEvent {
  type: string;
  orderId: string;
  createdAt: string;
}
