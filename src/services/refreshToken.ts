import { fetch } from "@tauri-apps/plugin-http";
import { API_BASE_URL } from "../constants/api";
import { APIResponse } from "../features/common/types";
import { LoginResponse } from "../features/auth/types";
import { tokenManager } from "./token";
import store from "../store";
import { actions } from "../features/auth";
import { EXCLUDED_REFRESH_PATHS } from "../constants/refreshToken";

/**
 * Normaliza qualquer URL de request para o pathname relativo ao API base.
 * Funciona para URLs completas ("http://host/api/auth/login") e relativas ("/auth/login").
 */
function toApiPath(url: string): string {
  try {
    const basePath = new URL(API_BASE_URL).pathname.replace(/\/$/, "");
    const { pathname } = url.startsWith("http")
      ? new URL(url)
      : new URL(url, API_BASE_URL);
    return basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  } catch {
    return url;
  }
}

/** Retorna true para rotas que não devem disparar refresh de token. */
export function shouldSkipRefreshRequest(url?: string): boolean {
  if (!url) return false;
  return EXCLUDED_REFRESH_PATHS.includes(toApiPath(url));
}

/**
 * Faz a chamada HTTP de refresh de token.
 * Só limpa o token e dispara logout quando a API recusa o refresh (401);
 * falha de rede ou 5xx apenas rejeita, sem derrubar a sessão.
 * Chamada apenas pelo triggerRefresh() em api.ts — sem deduplicação aqui.
 */
export async function performRefresh(): Promise<void> {
  // Precisa passar pelo plugin-http: o cookie httpOnly `refresh_token` do login
  // fica no cookie jar do lado Rust, invisível para o fetch/XHR do webview.
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
    signal: AbortSignal.timeout(15_000),
  });

  if (response.status === 401) {
    await tokenManager.clear();
    store.dispatch(actions.logout());
  }
  if (!response.ok) throw new Error(`refresh-${response.status}`);

  const body: APIResponse<LoginResponse> = await response.json();
  const newToken = body.data?.accessToken;
  if (!newToken) throw new Error("refresh-no-token");

  await tokenManager.set(newToken);
  store.dispatch(
    actions.setAuth({
      data: { tenantId: body.data.tenantId },
      token: newToken,
    }),
  );
}
