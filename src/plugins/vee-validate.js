import Vue from 'vue';

import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

setInteractionMode('aggressive');

extend('required', {
    ...required,
    message: 'Ce champ est obligatoire'
});

