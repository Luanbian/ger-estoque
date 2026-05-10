import { jwtDecode, JwtPayload } from "jwt-decode";
import { appStore } from "./storage";

type CachedToken = {
  raw: string;
  payload: JwtPayload;
} | null;

class TokenManager {
  private cached: CachedToken = null;

  /** Hydrates in-memory cache from AppStore after appStore.init(). */
  load(): void {
    this.hydrate(appStore.get("accessToken"));
  }

  private hydrate(raw: string | null): void {
    if (!raw) {
      this.cached = null;
      return;
    }
    try {
      this.cached = { raw, payload: jwtDecode<JwtPayload>(raw) };
    } catch {
      this.cached = null;
    }
  }

  /** Synchronous — no IPC after init. */
  get(): string | null {
    return this.cached?.raw ?? null;
  }

  async set(raw: string): Promise<void> {
    await appStore.set("accessToken", raw);
    this.hydrate(raw);
  }

  async clear(): Promise<void> {
    await appStore.clear("accessToken");
    this.cached = null;
  }

  /** Synchronous expiry check — no IPC calls. */
  isExpiringSoon(thresholdSeconds = 120): boolean {
    const exp = this.cached?.payload?.exp;
    if (!exp) return true;
    return exp - Math.floor(Date.now() / 1000) < thresholdSeconds;
  }
}

export const tokenManager = new TokenManager();

// Backward-compatible exports — mantém contrato dos consumidores existentes
export const setAccessTokenCookie = (token: string) => tokenManager.set(token);
export const getAccessTokenCookie = (): Promise<string | null> =>
  Promise.resolve(tokenManager.get());
export const clearAccessTokenCookie = () => tokenManager.clear();
export const isTokenExpiringSoon = (thresholdSeconds?: number): Promise<boolean> =>
  Promise.resolve(tokenManager.isExpiringSoon(thresholdSeconds));
