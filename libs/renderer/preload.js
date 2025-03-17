const { contextBridge, ipcRenderer } = require('electron');

const apis = {
  client: {
    add: params => ipcRenderer.invoke('client:add', params),
    modify: params => ipcRenderer.invoke('client:modify', params),
    remove: params => ipcRenderer.invoke('client:remove', params),
    query: () => ipcRenderer.invoke('client:query'),
    queryConfig: params => ipcRenderer.invoke('client:queryConfig', params),
    modifyConfig: params => ipcRenderer.invoke('client:modifyConfig', params),
    run: params => ipcRenderer.invoke('client:run', params),
    versionsDetection: params => ipcRenderer.invoke('client:versionsDetection', params),
  },
  dialog: {
    showOpenDialog: params => ipcRenderer.invoke('dialog:showOpenDialog', params),
  },
};

contextBridge.exposeInMainWorld('WebContex', {
  apis,
});
