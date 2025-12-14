export interface HealthStatus {
  status: string;
  details?: Record<string, any>;
}

export interface HealthCheckSliceState {
  data: HealthStatus | null;
  loading: boolean;
  error: string | null;
}

export interface HealthCheckResponse {
  status: string;
  info: Record<string, { [key: string]: string }>;
  error: Record<string, any>;
  details: Record<string, { [key: string]: string }>;
}
