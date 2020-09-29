import Vue from 'vue';

import user from './repositories/user.js';
import hidden from './repositories/hidden.js';

Vue.mixin({
    data: () => ({
        repos: {
            user,
            hidden
        }
    }),

    methods: {
        setLoading(loading) {
            this.$store.commit('application/setLoading', loading);
        }
    }
});