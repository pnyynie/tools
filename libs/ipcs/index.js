const { ipcMain } = require('electron');

const client = require('./client');
const dialog = require('./dialog');

function ipcs() {
  client.forEach(item => {
    let channel = `client:${item.key}`;
    ipcMain.handle(channel, item.handle);
  });

  dialog.forEach(item => {
    let channel = `dialog:${item.key}`;
    ipcMain.handle(channel, item.handle);
  });
}

module.exports = ipcs;
