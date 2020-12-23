import Vue from 'vue';
import io from 'socket.io-client';

import user from './repositories/user.js';
import logs from './repositories/logs.js';
import hidden from './repositories/hidden.js';

import { mapState } from 'vuex';

const SOCKET_URL = process.env.NODE_ENV === 'production' ? 'https://socket.hiddenjvc.com' : 'http://192.168.1.21:8989';

Vue.mixin({
    data: () => ({
        repos: {
            user,
            logs,
            hidden
        }
    }),

    computed: {
        ...mapState('user', ['isAdmin'])
    },

    methods: {
        setLoading(loading) {
            this.$store.commit('application/setLoading', loading);
        },

        openErrorDialog(message) {
            this.$store.commit('application/openErrorDialog', message);
        },

        closeErrorDialog() {
            this.$store.commit('application/closeErrorDialog');
        },

        async getConnectedUsersCount(forumId, topicId) {
            return new Promise((resolve, reject) => {
                const jwt = this.$store.state.user.jwt;

                const data = {
                    forumId: forumId,
                    hidden: true
                };

                if (jwt !== null) {
                    data.jwt = jwt;
                }

                if (topicId) {
                    data.hidden = true;
                    data.topicId = topicId;
                }

                const socket = io.connect(SOCKET_URL, { transports: ['websocket'] });

                socket.on('connect', () => {
                    socket.emit('get-users-count', data, (response) => {
                        const forumCount = response.forumCount;
                        const forumUsers = response.forumUsers;
                        const topicCount = response.topicCount;
                        const topicUsers = response.topicUsers;
                        resolve({ forumCount, forumUsers, topicCount, topicUsers });
                    });
                });

                socket.on('connect_error', function (err) {
                    reject(err);
                });
            });
        }
    }
});