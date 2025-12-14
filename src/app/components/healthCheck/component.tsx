import Typography from "@mui/material/Typography";

interface HealthCheckProps {
  status: string;
}

export const HealthCheckComponent = ({ status }: HealthCheckProps) => {
  return (
    <Typography variant="h1">
      Health Check Component - Status: {status}
    </Typography>
  );
};
