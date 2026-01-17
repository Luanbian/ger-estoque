export interface PlanType {
  _id?: string;
  planId: string;
  name: string;
  description?: string;
  price: number;
  durationInDays: number;
  features: Record<string, string | boolean | number>;
}

export interface PlanTypeState {
  data: PlanType[] | null;
  loading: boolean;
  error: string | null;
}
