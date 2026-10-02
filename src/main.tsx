import React from "react";
import ReactDOM from "react-dom/client";
import { jwtDecode } from "jwt-decode";
import { loadConfig } from "./constants/api";
import { appStore } from "./services/storage";
import { tokenManager } from "./services/token";
import store from "./store";
import { actions as authActions } from "./features/auth";
import App from "./App";

async function bootstrap() {
  try {
    await loadConfig();
  } catch (e) {
    console.error("[bootstrap] loadConfig failed, using defaults:", e);
  }

  try {
    await appStore.init();
    tokenManager.load();

    const token = tokenManager.get();
    if (token) {
      store.dispatch(
        authActions.setAuth({
          data: { tenantId: jwtDecode(token).sub ?? "" },
          token,
        }),
      );
    }
  } catch (e) {
    console.error("[bootstrap] store init failed:", e);
  }

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

bootstrap();
