"use client";
import { useEffect } from "react";
import * as locales from "@mui/material/locale";
import _ from "lodash";
import { createTheme } from "@mui/material/styles";
import { AppState } from "../../store/index";
import { useSelector } from "../../store/hooks";
import typography from "./Typography";
import components from "./Components";
import DarkThemeColors from "./DarkThemeColors";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import LightThemeColors from "./LightThemeColors";
import { darkshadows, shadows } from "./Shadows";

export const BuildTheme = (config: any = {}) => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const themeOptions = LightThemeColors.find(
    (theme) => theme.name === config.theme
  );
  const darkthemeOptions = DarkThemeColors.find(
    (theme) => theme.name === config.theme
  );

  baseDarkTheme.palette.primary.main = baseDarkTheme.palette.primary.main;
  themeOptions
    ? (themeOptions.palette.primary.main = themeOptions?.palette.primary.main)
    : null;
  const defaultTheme =
    customizer.activeMode === "dark" ? baseDarkTheme : baselightTheme;
  const defaultShadow =
    customizer.activeMode === "dark" ? darkshadows : shadows;
  const themeSelect =
    customizer.activeMode === "dark" ? darkthemeOptions : themeOptions;

  const baseMode = {
    palette: {
      mode: customizer.activeMode,
    },
    shape: {
      borderRadius: 50,
    },
    shadows: defaultShadow,
    typography: typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    })
  );

  theme.components = components(theme);

  return theme;
};

const ThemeSettings = () => {
  const activDir = useSelector((state: AppState) => state.customizer.activeDir);
  const activeTheme = useSelector(
    (state: AppState) => state.customizer.activeTheme
  );

  const theme = BuildTheme({
    direction: activDir,
    theme: activeTheme,
  });
  useEffect(() => {
    document.dir = activDir as string;
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-color",
      baseDarkTheme.palette.primary.main
    );
  }, [activDir]);

  return theme;
};

export { ThemeSettings };
