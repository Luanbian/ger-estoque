import { load, Store } from "@tauri-apps/plugin-store";

let _store: Store | null = null;

export const getStore = async (): Promise<Store> => {
  if (!_store) {
    _store = await load("storage.json", {
      defaults: { accessToken: null },
      autoSave: true,
    });
  }
  return _store;
};
