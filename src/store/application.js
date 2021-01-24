import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default {
    namespaced: true,

    state: {
        loading: false,
        errorDialogOpen: false,
        errorDialogMessage: '',
        logs: []
    },

    mutations: {
        setLoading(state, loading) {
            state.loading = typeof loading === 'boolean' ? loading : false;
        },

        openErrorDialog(state, message) {
            state.errorDialogMessage = message;
            state.errorDialogOpen = true;
        },

        closeErrorDialog(state) {
            state.errorDialogOpen = false;
            state.errorDialogMessage = '';
        },

        pushLog(state, log) {
            const hours = format(new Date(), 'kk:mm:ss', { locale: fr });
            state.logs.push(`${hours} - ${log}`);
        }
    }
};