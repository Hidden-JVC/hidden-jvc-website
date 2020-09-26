import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './user.js';
import application from './application.js';

export default new Vuex.Store({
    modules: {
        user,
        application
    }
});
