import Vue from 'vue';

import user from './repositories/user.js';
import logs from './repositories/logs.js';
import hidden from './repositories/hidden.js';

import { mapState } from 'vuex';

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
        }
    }
});