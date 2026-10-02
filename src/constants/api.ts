export let API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
export let WS_BASE_URL =
  import.meta.env.VITE_PUBLIC_WS_BASE_URL || "http://localhost:3000";
export let ASSETS_BASE_URL =
  import.meta.env.VITE_PUBLIC_ASSETS_BASE_URL || "http://localhost:3000";

import { fetch } from "@tauri-apps/plugin-http";

export async function loadConfig(): Promise<void> {
  const res = await fetch(
    "https://luanbian.github.io/ger-estoque-config/data.json",
    { signal: AbortSignal.timeout(5_000) },
  );
  const data = await res.json();
  if (typeof data.url !== "string") throw new Error("data.json sem url");
  API_BASE_URL = `${data.url}/api`;
  WS_BASE_URL = data.url;
  ASSETS_BASE_URL = data.url;
}
