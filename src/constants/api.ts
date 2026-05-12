export var API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
export var WS_BASE_URL =
  import.meta.env.VITE_PUBLIC_WS_BASE_URL || "http://localhost:3000";

import { fetch } from "@tauri-apps/plugin-http";

export async function loadConfig(): Promise<void> {
  const res = await fetch(
    "https://luanbian.github.io/ger-estoque-config/data.json",
  );
  const data = await res.json();
  API_BASE_URL = `${data.url}/api`;
  WS_BASE_URL = data.url;
}
