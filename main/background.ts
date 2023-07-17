import { Menu, Tray, app } from "electron";
import serve from "electron-serve";
import { createWindow, getAppPath } from "./helpers";
import NotificationHandler from "./helpers/notificationHandler";
import { loadIpcHandlers } from "./ipc";
const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  const iconpath = getAppPath("resources/icon.ico");
  const mainWindow = createWindow("main", {
    width: 600,
    height: 700,
    title: "LAR",
    icon: iconpath,
  });
  const tray = new Tray(iconpath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.quit();
      },
    },
  ]);
  tray.on("click", () => {
    mainWindow.show();
  });
  tray.setContextMenu(contextMenu);
  //* Load the IPC Handlers
  loadIpcHandlers();
  //* Initialize the Notification handler
  NotificationHandler.init();

  //* Load our Page
  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();
app.on("window-all-closed", () => {
  app.quit();
});
