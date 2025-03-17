const { app, BrowserWindow } = require('electron');
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const ipcs = require('./ipcs');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1400,
    height: 800,
    // titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, '/renderer/preload.js'),
    },
  });
  return window;
};

app.whenReady().then(() => {
  ipcs();
  const mainWindow = createWindow();

  mainWindow.setMenu(null);

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    // mainWindow.setIcon(path.join(__dirname, '../build/icon/icon.ico'));
  }
});

app.on('window-all-closed', () => {
  console.log('window-all-closed');
  if (process.platform !== 'darwin') app.quit();
});
