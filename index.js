const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

var win;
var tray;
const iconpath = path.join(__dirname, 'favicon.ico');
function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: '#FFF',
		title: "LAR",
		icon: iconpath,
		webPreferences: {
			preload: path.join(__dirname, 'js/preload.js'),
			nodeIntegration: true
		}
	});
	win.loadFile('views/index.html');

	tray = new Tray(iconpath);
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show App', click: function () {
				win.show();
			}
		},
		{
			label: 'Quit', click: function () {
				app.isQuiting = true;
				app.quit();
			}
		}
	])
	tray.setContextMenu(contextMenu);


	// and load the index.html of the app.

	// Open the DevTools.
	//win.webContents.openDevTools();
	win.on('close', function (event) {
		win = null;
	})

	win.on('minimize', function (event) {
		win.hide();
		event.preventDefault();
	})

	win.on('show', function () {
		appIcon.setHighlightMode('always');
	})

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})
app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.