import { app, BrowserWindow, ipcMain, Notification } from "electron";
import * as path from "path";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { AppStorage } from "./storage/AppStorage";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    minHeight: 800,
    minWidth: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#2A2D35",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 30,
      color: "#1F2127",
      symbolColor: "#fff",
    },
    icon: path.join(__dirname, "../assets/app-icons/512x512.ico"),
  });

  // dev: open nuxt app
  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

let a;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    const appStorage = new AppStorage({ path: app.getPath("appData") });
    appStorage.createConfig();

    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log("Added extension: ", name))
      .catch((err) => console.error("An error occurred ", err));

    ipcMain.on("allow-resizing", (e, value) => {
      BrowserWindow.getAllWindows()[0].resizable = value;
    });

    createWindow();

    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .then(() => {
    a = new Notification({
      title: "Test notification",
      body: "Notification from Main process",
      icon: path.join(__dirname, "../assets/app-icons/512x512.ico"),
    });

    a.on("click", () => {
      BrowserWindow.getAllWindows()[0].focus();
    });

    a.show();
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
