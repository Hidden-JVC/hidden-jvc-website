import Vue from 'vue';

import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
import { required, min, max } from 'vee-validate/dist/rules';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

setInteractionMode('passive');

extend('min', {
    ...min,
    params: ['length'],
    message: 'Ce champ doit contenir au moins {length} caractères'
});

extend('max', {
    ...max,
    params: ['length'],
    message: 'Ce champ ne doit pas contenir plus de {length} caractères'
});

extend('required', {
    ...required,
    message: 'Ce champ est obligatoire'
});

extend('noelshackurl', {
    message: 'Vous devez saisir un lien noelshack valide',
    validate(value) {
        if (typeof value !== 'string') {
            return false;
        }
        return value.startsWith('https://www.noelshack.com/') || value.startsWith('https://image.noelshack.com/');
    }
});
