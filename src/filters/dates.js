import Vue from 'vue';
import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

const current = new Date();

Vue.filter('topicLastPostDate', (str) => {
    const date = new Date(str);
    if (isSameDay(current, date)) {
        return format(date, 'kk:mm:ss', { locale: fr });
    } else {
        return format(date, 'dd/MM/yyyy', { locale: fr });
    }
});

Vue.filter('postDate', (str) => format(new Date(str), 'dd MMMM yyyy à kk:mm:ss', { locale: fr }));
