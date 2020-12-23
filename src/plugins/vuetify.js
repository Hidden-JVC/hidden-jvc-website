import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/es5/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { fr },
        current: 'fr'
    },
    icons: {
        iconfont: 'fa'
    },
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#060',
                error: '#c62828'
            }
        }
    }
});
