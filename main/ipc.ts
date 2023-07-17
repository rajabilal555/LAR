import { ipcMain } from "electron";
import NotificationHandler from "./helpers/notificationHandler";
import { settingsStore } from "./helpers/storageHelper";

export function loadIpcHandlers() {
  ipcMain.handle("getSettingValue", (event, key: string) => {
    return settingsStore.get(key);
  });

  ipcMain.handle("updateSettings", (event, settings: SettingsStoreType) => {
    try {
      settingsStore.set("interval", settings.interval);
      settingsStore.set("message", settings.message);
      const notificationHandler = NotificationHandler.getInstance();
      notificationHandler.update(settings.interval, settings.message);
      console.log(
        `Set interval to ${settings.interval} and message to ${settings.message}`
      );
      return true;
    } catch (error) {
      return false;
    }
  });

  ipcMain.on("show:testNotification", (event, arg) => {
    NotificationHandler.getInstance().sendNotification();
  });
}
