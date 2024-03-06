// ! modules

export const STATUS = {
  SIMPLE: 'dev',
  DEV: true,
  PROD: false,
};

export const WEB_SOCKET_SETTING = {
  URL: STATUS.DEV
    ? 'ws://localhost:5005/websocket'
    : 'ws://ReddNotes.adaptable.app/websocket',
};
