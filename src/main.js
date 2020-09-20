import Vue from 'vue';
import vuetify from './plugins/vuetify';
import './plugins/vee-validate';

import App from './App.vue';
import router from './router.js';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './mixin.js';
import './filters/index.js';

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
