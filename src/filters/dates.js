import Vue from 'vue';
import { format, isSameDay, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const current = new Date();

Vue.filter('dateFormat', (str) => {
    return format(new Date(str), 'dd/MM/yyyy', { locale: fr });
});

Vue.filter('topicLastPostDate', (str) => {
    const date = new Date(str);
    if (isSameDay(current, date)) {
        return format(date, 'kk:mm:ss', { locale: fr });
    } else {
        return format(date, 'dd/MM/yyyy', { locale: fr });
    }
});

Vue.filter('postDate', (str) => format(new Date(str), 'dd MMMM yyyy à kk:mm:ss', { locale: fr }));

Vue.filter('toDateStr', (str) => format(new Date(str), 'dd MMMM yyyy', { locale: fr }));
Vue.filter('daysSinceDate', (str) => differenceInDays(new Date(), new Date(str)));
