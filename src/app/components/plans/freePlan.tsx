import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { convertFromCents } from "../../../utils/convertTocents";
import { PlanType } from "../../../features/plans/types";

interface Props {
  data: {
    plan: PlanType;
  };
  actions: {
    selectedPlanType: (planTypeId: string) => void;
  };
}

export const FreePlan = ({ data, actions }: Props) => {
  const { _id, name, price, durationInDays, features } = data.plan;
  const { selectedPlanType } = actions;

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        elevation={12}
        sx={{
          width: 340,
          borderRadius: 3,
          transform: "translateY(-12px)",
          boxShadow: theme.shadows[8],
          overflow: "visible",
        }}
      >
        <CardContent sx={{ px: 4, py: 3 }}>
          <Stack spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              {name}
            </Typography>

            <Stack direction="row" alignItems="baseline" spacing={0.5}>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: 800, lineHeight: 1 }}
              >
                R$ {convertFromCents(price)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                /mês
              </Typography>
            </Stack>
          </Stack>

          {/* TODO: Implement feature mapper to work properly */}
          <Box>
            {Object.entries(features).map(([key, value]) => (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 0.5,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {key.replace(/_/g, " ")}
                </Typography>
                <Typography variant="body1">
                  {typeof value === "boolean" ? (value ? "Sim" : "Não") : value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => selectedPlanType(_id!)}
              type="submit"
            >
              Prosseguir
            </Button>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1, textAlign: "center" }}
          >
            Sem cobrança. Atualize a qualquer momento. experimente por
            {durationInDays} dias
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
