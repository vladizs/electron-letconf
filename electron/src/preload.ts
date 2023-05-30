import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('appBridge', {
  allowResizing(value: boolean) {
    ipcRenderer.send('allow-resizing', value);
  }
})