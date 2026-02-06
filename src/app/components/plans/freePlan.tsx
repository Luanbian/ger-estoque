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
import { useFormContext } from "react-hook-form";
import { CreateAccountShopkeeperPayload } from "../../../features/accountShopkeeper/types";
import { SubscriptionBillingStatus } from "../../../features/common/billingStatusEnum";
import { featureMapper } from "../../../utils/featuresMapper";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";

interface Props {
  data: {
    plan: PlanType;
  };
}

export const FreePlan = ({ data }: Props) => {
  const { _id, name, price, features } = data.plan;

  const theme = useTheme();

  const methods = useFormContext<CreateAccountShopkeeperPayload>();

  const handleSelect = (_id?: string) => {
    if (!_id) return;
    methods.setValue("subscription.planTypeId", _id);
    methods.setValue(
      "subscription.billingStatus",
      SubscriptionBillingStatus.FAILED,
    );
  };

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

          <Box>
            {Object.entries(features).map(([key, value]) => (
              <Box
                key={key}
                display={"flex"}
                justifyContent={"space-between"}
                p={0.5}
              >
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {featureMapper[key as keyof typeof featureMapper]}
                </Typography>
                <Typography variant="body1">
                  {Boolean(value) ? (
                    <IconCircleCheck color={theme.palette.success.main} />
                  ) : (
                    <IconXboxX color={theme.palette.error.main} />
                  )}
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
              onClick={() => handleSelect(_id)}
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
            Cancelamento a qualquer momento.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
