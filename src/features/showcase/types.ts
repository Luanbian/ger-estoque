export interface Showcase {
  _id: string;
  tenantId: string;
  name: string;
  hash: string;
}

export interface ShowcaseState {
  data: Showcase | null;
  loading: boolean;
  error: string | null;
  message?: string;
}

export interface CreateShowcasePayload {
  name: string;
}
