import React from "react";
import ReactDOM from "react-dom/client";
import { loadConfig } from "./constants/api";
import { appStore } from "./services/storage";
import { tokenManager } from "./services/token";
import App from "./App";

async function bootstrap() {
  await loadConfig();
  await appStore.init();
  tokenManager.load();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

bootstrap();
