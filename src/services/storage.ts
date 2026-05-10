type AppStoreSchema = {
  accessToken: string | null;
};

const STORE_FILE = "storage.json";
const DEFAULTS: AppStoreSchema = { accessToken: null };
const SCHEMA_KEYS = Object.keys(DEFAULTS) as (keyof AppStoreSchema)[];

type TauriStore = {
  get: <T>(key: string) => Promise<T | null | undefined>;
  set: (key: string, value: unknown) => Promise<void>;
};

class AppStore {
  private cache: AppStoreSchema = { ...DEFAULTS };
  private backend: TauriStore | null = null;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    const isTauri =
      typeof window !== "undefined" && (window as any).__TAURI__ !== undefined;
    if (!isTauri) {
      throw new Error(
        "Tauri runtime not found. Run the app with `npm run tauri dev`.",
      );
    }

    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_FILE, {
      defaults: DEFAULTS,
      autoSave: true,
    });

    // Hydrate in-memory cache from the persisted store on startup
    for (const key of SCHEMA_KEYS) {
      const value = await store.get<AppStoreSchema[typeof key]>(key);
      if (value !== null && value !== undefined) {
        (this.cache as Record<string, unknown>)[key] = value;
      }
    }

    this.backend = {
      get: (k) => store.get(k),
      set: (k, v) => store.set(k, v),
    };

    this.initialized = true;
  }

  private assertReady(): void {
    if (!this.initialized) {
      throw new Error(
        "[AppStore] Not initialized. Call appStore.init() at app bootstrap before any store access.",
      );
    }
  }

  /** Synchronous after init — no IPC overhead on reads. */
  get<K extends keyof AppStoreSchema>(key: K): AppStoreSchema[K] {
    this.assertReady();
    return this.cache[key];
  }

  /** Updates cache immediately; persists to Tauri store asynchronously. */
  async set<K extends keyof AppStoreSchema>(
    key: K,
    value: AppStoreSchema[K],
  ): Promise<void> {
    this.assertReady();
    this.cache[key] = value;
    await this.backend?.set(key, value);
  }

  /** Resets a key to its default value in both cache and persistent store. */
  async clear<K extends keyof AppStoreSchema>(key: K): Promise<void> {
    await this.set(key, DEFAULTS[key]);
  }
}

export const appStore = new AppStore();
