import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/container";
import { Sidebar } from "./components/sidebar/container";
import { useSelector } from "../store/hooks";

export const MainLayout = () => {
  const { isCollapse, SidebarWidth } = useSelector((state) => state.customizer);

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
      </Box>
    </Box>
  );
};
