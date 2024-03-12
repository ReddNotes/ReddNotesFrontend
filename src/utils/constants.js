// constants.js

// ! modules

export const SERVER_SETTING = {
  PORT: 5173,
  STATUS: {
    SIMPLE: 'prod', // 'dev'
    DEV: false, // true
    PROD: true, // false
  },
};

export const WEB_SOCKET_SETTING = {
  URL: SERVER_SETTING.STATUS.DEV
    ? 'ws://localhost:5005/websocket'
    : 'wss://reddnotes.adaptable.app/websocket',
};
