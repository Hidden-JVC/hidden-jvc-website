import Vue from 'vue';

import forum from './repositories/forum.js';

Vue.mixin({
    data: () => ({
        repos: {
            forum
        }
    })
});