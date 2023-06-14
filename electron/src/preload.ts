import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('appBridge', {
  allowResizing(value: boolean) {
    ipcRenderer.send('allow-resizing', value);
  },
  getCookies(value: boolean) {
    ipcRenderer.send('getCookie', value);
  },
  onFocusStateChange: (callback: (focused: boolean) => void) => {
    ipcRenderer.on('focus', () => callback(true));
    ipcRenderer.on('blur', () => callback(false));
  },
  isMac: process.platform === 'darwin',
  platform: process.platform,
});