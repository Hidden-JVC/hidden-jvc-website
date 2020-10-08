export default {
    namespaced: true,

    state: {
        userId: null,
        name: null,
        jwt: null,
        isAdmin: false,
        moderators: [],
        anonymousName: 'Anonymous',
        favoriteStickers: []
    },

    // const state = {
    //     user: {
    //         jwt: null,
    //         userId: null,
    //         isAdmin: false,
    //         moderators: [],
    //         anonymousName: 'Anonymous',
    //         registeredName: null
    //     }
    // };

    getters: {
        isModeratorOnForum: (state) => (forumId) => {
            return state.moderators.filter((m) => m.ForumId === forumId).length === 1;
        },

        hasRightOnForum: (state) => (forumId, action) => {
            const moderator = state.moderators.find((m) => m.ForumId === forumId);
            console.log(forumId);
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

            localStorage.setItem('user/userId', data.userId);
            localStorage.setItem('user/name', data.name);
            localStorage.setItem('user/jwt', data.jwt);
            localStorage.setItem('user/isAdmin', data.isAdmin);
            localStorage.setItem('user/moderators', JSON.stringify(data.moderators));
        },

        setAnonymousName(state, name) {
            state.anonymousName = name;
            localStorage.setItem('user/anonymousName', name);
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
            state.moderators = null;

            localStorage.removeItem('user/userId');
            localStorage.removeItem('user/name');
            localStorage.removeItem('user/jwt');
            localStorage.removeItem('user/isAdmin');
            localStorage.removeItem('user/moderators');
        },

        loadFromLocalStorage(state) {
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

            const anonymousName = localStorage.getItem('user/anonymousName');
            if (anonymousName !== null) {
                state.anonymousName = anonymousName;
            }

            const favoriteStickers = localStorage.getItem('user/favoriteStickers');
            if (favoriteStickers !== null) {
                state.favoriteStickers = JSON.parse(favoriteStickers);
            }
        }
    }
};