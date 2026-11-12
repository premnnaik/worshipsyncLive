import { io } from 'socket.io-client';

// In development, Vite proxies /socket.io to http://localhost:4000
// In production or direct IP access, connect to window.location.origin
const URL = window.location.port === '5173' ? 'http://' + window.location.hostname + ':4000' : '/';

export const socket = io(URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity, // Keep retrying indefinitely for multi-hour meetings
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 30000,
  transports: ['websocket', 'polling']
});

// Socket helper with Promise response
export const emitWithAck = (event, data, timeoutMs = 8000) => {
  return new Promise((resolve, reject) => {
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({ success: false, timeout: true });
      }
    }, timeoutMs);

    socket.emit(event, data, (response) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(response || { success: true });
      }
    });
  });
};
