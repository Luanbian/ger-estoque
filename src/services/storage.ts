import { ENV } from "../constants/env";

type StoreLike = {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
  save(): Promise<void>;
};

let _store: StoreLike | null = null;

export const getStore = async (): Promise<StoreLike> => {
  if (_store) return _store;

  const defaults = { accessToken: null };

  // If we're not in dev mode, require Tauri runtime.
  if (ENV !== "dev") {
    const isTauri =
      typeof window !== "undefined" && (window as any).__TAURI__ !== undefined;
    if (!isTauri) {
      throw new Error(
        "This build expects the Tauri runtime. Run with `npm run tauri dev`."
      );
    }

    const { load } = await import("@tauri-apps/plugin-store");
    _store = await load("storage.json", { defaults, autoSave: true });
    return _store;
  }

  // dev/browser fallback using localStorage
  const key = "storage.json";
  let data: Record<string, any> = {};

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = localStorage.getItem(key);
      data = raw ? JSON.parse(raw) : { ...defaults };
    } catch (e) {
      data = { ...defaults };
    }
  } else {
    data = { ...defaults };
  }

  const save = async () => {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      // ignore write errors (e.g., private mode)
    }
  };

  _store = {
    get: async (k: string) => (k in data ? data[k] : null),
    set: async (k: string, v: any) => {
      data[k] = v;
    },
    save: async () => {
      await save();
    },
  };

  return _store;
};
