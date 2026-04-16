export interface Whatsapp {
  _id: string;
  tenantId: string;
  acceptedMessage: string;
  rejectedMessage: string;
}

export interface WhatsappState {
  data: Whatsapp | null;
  loading: boolean;
  error: string | null;
}
