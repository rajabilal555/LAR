import Store from "electron-store";

export const settingsStore = new Store<SettingsStoreType>({
  schema: {
    interval: {
      type: "number",
      minimum: 1,
    },
    message: {
      type: "string",
    },
  },
  defaults: {
    interval: 120,
    message: "Time for a little break",
  },
});

export function getStoredNumber(key: string, defaultValue?: number): number {
  try {
    return settingsStore.get(key, defaultValue);
  } catch (error) {
    console.error(`Error retrieving value for key "${key}":`, error);
    throw error;
  }
}

export function setStoredNumber(key: string, value: number): void {
  try {
    settingsStore.set(key, value);
  } catch (error) {
    console.error(`Error saving value for key "${key}":`, error);
    throw error;
  }
}

export function getStoredString(key: string, defaultValue?: string): string {
  try {
    const val = settingsStore.get(key, defaultValue);
    return val;
  } catch (error) {
    console.error(`Error retrieving value for key "${key}":`, error);
    throw error;
  }
}

export function setStoredString(key: string, value: string): void {
  try {
    settingsStore.set(key, value);
  } catch (error) {
    console.error(`Error saving value for key "${key}":`, error);
    throw error;
  }
}
