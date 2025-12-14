interface HealthCheckProps {
  status: string;
}

export const HealthCheckComponent = ({ status }: HealthCheckProps) => {
  return <div>Health Check Component - Status: {status}</div>;
};
