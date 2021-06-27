import { IS_EXTENSION } from '../constants';

export default {
    namespaced: true,

    state: {
        user: null,
        notifications: [],

        userId: null,
        name: null,
        jwt: null,
        isAdmin: false,
        moderators: [],
        favoriteStickers: []
    },

    getters: {
        isModeratorOnForum: (state) => (forumId) => {
            return state.moderators.filter((m) => m.ForumId === forumId).length === 1;
        },

        hasRightOnForum: (state) => (forumId, action) => {
            const moderator = state.moderators.find((m) => m.ForumId === forumId);
            if (!moderator) {
                return false;
            }

            return moderator.Actions.includes(action);
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setNotifications(state, notifications) {
            state.notifications = notifications;
        },

        setJwt(state, data) {
            state.jwt = data.jwt;

            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ state: null }, function (result) {
                    if (result.state) {
                        result.state.user.jwt = data.jwt;
                        window.chrome.storage.local.set(result);
                    }
                });
            } else {
                localStorage.setItem('user/jwt', data.jwt);
            }
        },

        addFavoriteStickers(state, stickerUrl) {
            if (!state.favoriteStickers.includes(stickerUrl)) {
                state.favoriteStickers.push(stickerUrl);
                localStorage.setItem('user/favoriteStickers', JSON.stringify(state.favoriteStickers));
            }
        },

        removeFavoriteStickers(state, stickerUrl) {
            state.favoriteStickers = state.favoriteStickers.filter((url) => url !== stickerUrl);
            localStorage.setItem('user/favoriteStickers', JSON.stringify(state.favoriteStickers));
        },

        disconnect(state) {
            state.jwt = null;
            state.user = null;

            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ state: null }, function (result) {
                    if (result.state) {
                        result.state.user.jwt = null;
                        window.chrome.storage.local.set(result);
                    }
                });
            } else {
                localStorage.removeItem('user/jwt');
            }
        },

        loadFromStorage(state) {
            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ state: null }, function (result) {
                    if (result.state) {
                        state.jwt = result.state.user.jwt;
                        state.favoriteStickers = result.state.user.favoriteStickers;
                    }
                });
            } else {
                const jwt = localStorage.getItem('user/jwt');
                if (jwt !== null) {
                    state.jwt = jwt;
                }

                const favoriteStickers = localStorage.getItem('user/favoriteStickers');
                if (favoriteStickers !== null) {
                    state.favoriteStickers = JSON.parse(favoriteStickers);
                }
            }
        }
    }
};
