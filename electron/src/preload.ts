import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('appBridge', {
  allowResizing(value: boolean) {
    ipcRenderer.send('allow-resizing', value);
  },
  onFocusStateChange: (callback: (focused: boolean) => void) => {
    ipcRenderer.on('focus', () => callback(true));
    ipcRenderer.on('blur', () => callback(false));
  },
  isMac: process.platform === 'darwin',
});