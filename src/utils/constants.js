// constants.js

// ! modules

export const APP_SETTING = {
  PORT: 5173,
  STATUS: {
    SIMPLE: 'prod', // 'dev', 'prod'
    DEV: false, // true
    PROD: true, // false
  },
};

export const AVATARS = {
  ALL: [
    'https://images.squarespace-cdn.com/content/v1/534da481e4b0de6fe45c8373/1418453645086-89C5XYGTDFYPS57TA6QP/image-asset.png',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2022180/e081bb44f8c79e9b5ae44d1be71aae559d7fcf88.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1944060/3c6e22e1856a08f4f1d7ee8dec21d7a28bb56eb2.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1091500/d3ca470b90fe64e5203af68b5238e99665b05e2f.gif',

    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1940340/8a6bf2dfc491be809c2fccf61f297d6f98ac049d.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1940340/555d0697e8fa02963b5737f00fb15d456b45f5f2.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1940340/924c7cae50b20992ddbd4bc0e4cc75b09d5da04b.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1940340/5142a374d3f56296757c398eb9844e6ceb380fdc.gif',

    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/620/d70a96496a8afc0602d9903859017c60e5dfc319.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/620/9b150c165611e0f04ac9edb860656d7e67d56fbe.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/620/c61e4db1b916966ad76f8ee8413c474f869358af.gif',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/620/e52ee979bc61ff10f48eb7dd2a4d4c92c35f2c1a.gif',

    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1313140/dec867166e3380e522c2f83cadefc57308ce66c2.png',

    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2833130/8222747369de9793ae33ffb1121f588341474361.png',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2833130/ac4ff9b0c7793f937f3aaa72f8bdcb754643e15e.gif',

    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/105600/bf1acd0a0e0b6d5df2f538f94026d629e53909e6.gif',
  ],
};

export const LOCAL_STORAGE_VARIABLES = ['token', 'isDarkModeEnabled'];

export const WEB_SOCKET_SETTING = {
  URL: APP_SETTING.STATUS.DEV
    ? 'ws://localhost:5005/websocket'
    : 'wss://reddnotes.adaptable.app/websocket',
};
