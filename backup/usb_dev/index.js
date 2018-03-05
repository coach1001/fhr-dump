'use strict';
const electron = require('electron');
var HID = require('node-hid');
const ipcMain = electron.ipcMain;
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({	
		width: 1024,
		height: 768,		
	});
	win.setFullScreen(true)
	win.loadURL(`file://${__dirname}/app_client/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	console.log('devices:', HID.devices());

	ipcMain.on('electron-msg', function(event, msg) {

		if (msg.appdirective) {
			if (msg.exit) {
				app.quit()
			}
			if (msg.minimize) {
				mainWindow.minimize()
			}
		}
	})
});
