import { Menu, Notification, Tray, app } from "electron";
import log from "electron-log";
import serve from "electron-serve";
import { createWindow, getAppPath } from "./helpers";
const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  const iconpath = getAppPath("resources/icon.ico");
  console.log(iconpath);
  log.info("Log from the main process");
  log.info(`IconPath: ${iconpath}`);
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

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
  setInterval(showNotification, 120000);
})();
const showNotification = () => {
  const NOTIFICATION_TITLE = "Look Away 🔔";
  const NOTIFICATION_BODY = "Avert yer eyeees!!!!";
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
};
app.on("window-all-closed", () => {
  app.quit();
});
