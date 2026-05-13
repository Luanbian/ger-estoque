import React from "react";
import ReactDOM from "react-dom/client";
import { loadConfig } from "./constants/api";
import { appStore } from "./services/storage";
import { tokenManager } from "./services/token";
import App from "./App";

async function bootstrap() {
  try {
    await loadConfig();
  } catch (e) {
    console.error("[bootstrap] loadConfig failed, using defaults:", e);
  }

  await appStore.init();
  tokenManager.load();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

bootstrap();
