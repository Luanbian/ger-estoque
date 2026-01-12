import { Box } from "@mui/material";
import { Header } from "./components/header/container";
import { useSelector } from "../store/hooks";

const Home = () => {
  const { isCollapse, SidebarWidth } = useSelector((state) => state.customizer);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      bgcolor={"red"}
    >
      <Header />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin 0.3s",
            marginLeft: isCollapse ? 0 : `${SidebarWidth}px`,
          }}
        >
          <h1>Bem-vindo ao Sistema de Gerenciamento de Estoque</h1>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
