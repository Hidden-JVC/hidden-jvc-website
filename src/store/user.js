import { IS_EXTENSION } from '../constants';

export default {
    namespaced: true,

    state: {
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
        setUser(state, data) {
            state.userId = data.userId;
            state.name = data.name;
            state.jwt = data.jwt;
            state.isAdmin = data.isAdmin;
            state.moderators = data.moderators;

            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ state: null }, function (result) {
                    if (result.state) {
                        result.state.user.jwt = data.jwt;
                        result.state.user.userId = data.userId;
                        result.state.user.isAdmin = data.isAdmin;
                        result.state.user.moderators = data.moderators;
                        result.state.user.registeredName = data.name;
                        window.chrome.storage.local.set(result);
                    }
                });
            } else {
                localStorage.setItem('user/userId', data.userId);
                localStorage.setItem('user/name', data.name);
                localStorage.setItem('user/jwt', data.jwt);
                localStorage.setItem('user/isAdmin', data.isAdmin);
                localStorage.setItem('user/moderators', JSON.stringify(data.moderators));
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
            state.userId = null;
            state.name = null;
            state.jwt = null;
            state.isAdmin = null;
            state.moderators = [];

            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ state: null }, function (result) {
                    if (result.state) {
                        result.state.user.jwt = null;
                        result.state.user.userId = null;
                        result.state.user.isAdmin = false;
                        result.state.user.moderators = [];
                        result.state.user.registeredName = null;
                        window.chrome.storage.local.set(result);
                    }
                });
            } else {
                localStorage.removeItem('user/userId');
                localStorage.removeItem('user/name');
                localStorage.removeItem('user/jwt');
                localStorage.removeItem('user/isAdmin');
                localStorage.removeItem('user/moderators');
            }
        },

        loadFromLocalStorage(state) {
            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ state: null }, function (result) {
                    if (result.state) {
                        state.userId = result.state.user.userId;
                        state.name = result.state.user.registeredName;
                        state.jwt = result.state.user.jwt;
                        state.isAdmin = result.state.user.isAdmin;
                        state.moderators = result.state.user.moderators;
                        state.favoriteStickers = result.state.user.favoriteStickers;
                    }
                });
            } else {
                const userId = localStorage.getItem('user/userId');
                if (userId !== null) {
                    state.userId = parseInt(userId);
                }

                const name = localStorage.getItem('user/name');
                if (name !== null) {
                    state.name = name;
                }

                const jwt = localStorage.getItem('user/jwt');
                if (jwt !== null) {
                    state.jwt = jwt;
                }

                const isAdmin = localStorage.getItem('user/isAdmin');
                if (isAdmin !== null) {
                    state.isAdmin = JSON.parse(isAdmin);
                }

                const moderators = localStorage.getItem('user/moderators');
                if (moderators !== null) {
                    state.moderators = JSON.parse(moderators);
                }

                const favoriteStickers = localStorage.getItem('user/favoriteStickers');
                if (favoriteStickers !== null) {
                    state.favoriteStickers = JSON.parse(favoriteStickers);
                }
            }
        }
    }
};