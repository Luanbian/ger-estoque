import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FreePlan } from "./freePlan";
import { StandardPlan } from "./standardPlan";
import { PlanType } from "../../../features/plans/types";

interface Props {
  data: {
    planTypes: PlanType[] | null;
    loading: boolean;
    error: string | null;
  };
}

export const Plans = ({ data }: Props) => {
  const { planTypes, loading, error } = data;
  console.log({ data });

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Typography color="error">Erro ao carregar planos: {error}</Typography>
    );

  return (
    <Card elevation={0} sx={{ background: "transparent" }}>
      <CardContent sx={{ px: 2, py: 3 }}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Planos
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: { xs: "column", sm: "row" },
            p: 1,
          }}
        >
          {planTypes &&
            planTypes.map((plan) => {
              if (plan.name.toLowerCase().includes("básico"))
                return <FreePlan key={plan._id} data={{ plan }} />;
              if (plan.name.toLowerCase().includes("premium"))
                return <StandardPlan key={plan._id} data={{ plan }} />;
            })}
        </Box>
      </CardContent>
    </Card>
  );
};
