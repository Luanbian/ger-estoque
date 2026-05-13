import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  base: "./",

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },

  // Build optimizations
  build: {
    // Reduce chunk size warning limit (optional, default is 500kB)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: (id) => {
          // MUI components in separate chunk
          if (id.includes("node_modules/@mui/material")) {
            return "mui-material";
          }
          if (id.includes("node_modules/@mui/icons-material")) {
            return "mui-icons";
          }
          if (
            id.includes("node_modules/@mui/lab") ||
            id.includes("node_modules/@mui/x-date-pickers") ||
            id.includes("node_modules/@mui/x-tree-view")
          ) {
            return "mui-lab";
          }

          // Emotion (MUI styling) in separate chunk
          if (id.includes("node_modules/@emotion")) {
            return "emotion";
          }

          // Redux and Saga in separate chunk
          if (
            id.includes("node_modules/redux") ||
            id.includes("node_modules/react-redux") ||
            id.includes("node_modules/@reduxjs/toolkit") ||
            id.includes("node_modules/redux-saga")
          ) {
            return "redux";
          }

          // React core libraries
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "react-vendor";
          }

          // Other large dependencies
          if (id.includes("node_modules/lodash")) {
            return "lodash";
          }
          if (id.includes("node_modules/axios")) {
            return "axios";
          }

          // All other node_modules in vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },

    // Enable minification with esbuild (faster than terser)
    minify: "esbuild",

    // Reduce bundle size
    target: "esnext",

    // Source maps (disable in production for smaller builds)
    sourcemap: false,
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-redux",
      "@reduxjs/toolkit",
      "redux-saga",
      "@mui/material",
      "@mui/icons-material",
      "axios",
    ],
  },
}));
