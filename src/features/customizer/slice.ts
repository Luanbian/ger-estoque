import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StateKeysStack = "header" | "curate" | "spotlight" | "navigation";
interface StateType {
  activeDir?: string | any;
  activeMode?: string; // This can be light or dark
  activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  isCollapse?: boolean;
}

const initialState: StateType = {
  activeDir: "ltr",
  activeMode: "dark", // This can be light or dark
  activeTheme: "BLACK_THEME", // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth: 200,
  MiniSidebarWidth: 87,
  isCollapse: false,
};

export const customizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setTheme: (state: StateType, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.activeTheme = "BLACK_THEME";
        state.activeMode = "dark";
      } else {
        state.activeTheme = "PURPLE_THEME";
        state.activeMode = "light";
      }
    },
    setDarkMode: (state: StateType, action) => {
      state.activeMode = action.payload;
    },
    setDir: (state: StateType, action) => {
      state.activeDir = action.payload;
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    },
  },
});

export const { setTheme, setDarkMode, setDir, toggleSidebar } =
  customizerSlice.actions;

export const customizerActionsCreators = customizerSlice.actions;
