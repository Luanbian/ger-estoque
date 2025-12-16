import { Suspense } from "react";
import { Provider } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeSettings } from "./utils/theme/Theme";
import store from "./store";
import { AppRoutes } from "./routes";

const LoadingFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

function ThemedApp() {
  const theme = createTheme({
    ...ThemeSettings(),
    direction: ThemeSettings().direction,
    palette: ThemeSettings().palette,
    typography: ThemeSettings().typography,
    shadows: ThemeSettings().shadows,
    shape: {
      borderRadius: ThemeSettings().shape.borderRadius,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;
