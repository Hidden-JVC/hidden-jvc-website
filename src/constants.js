// eslint-disable-next-line
const SOCKET_URL = process.env.NODE_ENV === 'production' ? 'https://socket.hiddenjvc.com' : 'http://127.0.0.1:8989';

const IS_EXTENSION = Object.prototype.hasOwnProperty.call(window, 'chrome');

export {
    SOCKET_URL,
    IS_EXTENSION
};
