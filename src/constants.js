const SOCKET_URL = process.env.NODE_ENV === 'production' ? 'https://socket.hiddenjvc.com' : 'http://192.168.1.21:8989';

const IS_EXTENSION = Object.prototype.hasOwnProperty.call(window, 'chrome');

export {
    SOCKET_URL,
    IS_EXTENSION
};
