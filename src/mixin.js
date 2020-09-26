import Vue from 'vue';

import user from './repositories/user.js';
import forum from './repositories/forum.js';

Vue.mixin({
    data: () => ({
        repos: {
            user,
            forum
        }
    }),

    methods: {
        setLoading(loading) {
            this.$store.commit('application/setLoading', loading);
        }
    }
});