import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/container";
import { Sidebar } from "./components/sidebar/container";
import { useDispatch, useSelector } from "../store/hooks";
import { actions as categoryActions } from "../features/categories";
import { actions as unitOfMeasureActions } from "../features/unitOfMeasure";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UnpaidWarning } from "./components/billingWarn/unpaid";
import { SubscriptionBillingStatus } from "../features/common/billingStatusEnum";

export const MainLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isCollapse, SidebarWidth } = useSelector((state) => state.customizer);

  let isUnpaid = false;
  if (token) {
    try {
      const payload: JwtPayload = jwtDecode(token);
      const billingStatus =
        "billingStatus" in payload ? (payload.billingStatus as string) : "";
      isUnpaid = billingStatus === SubscriptionBillingStatus.UNPAID;
    } catch (err) {
      // ignore decode errors
    }
  }

  useEffect(() => {
    dispatch(categoryActions.categoryRequest());
    dispatch(unitOfMeasureActions.unitOfMeasureRequest());
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin 0.3s",
            marginLeft: isCollapse ? 0 : `${SidebarWidth}px`,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
        {isUnpaid && <UnpaidWarning />}
      </Box>
    </Box>
  );
};
