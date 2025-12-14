import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeSettings } from "./utils/theme/Theme";
import store from "./store";
import Home from "./app/page";

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
      <Home />
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
