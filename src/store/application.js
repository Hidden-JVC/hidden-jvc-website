export default {
    namespaced: true,

    state: {
        loading: false
    },

    mutations: {
        setLoading(state, loading) {
            state.loading = typeof loading === 'boolean' ? loading : false;
        }
    }
};