export default {
    namespaced: true,

    state: {
        loading: false,
        displayForumTags: true
    },

    mutations: {
        setLoading(state, loading) {
            state.loading = typeof loading === 'boolean' ? loading : false;
        },

        setDisplayForumTags(state, displayForumTags) {
            state.displayForumTags = typeof displayForumTags === 'boolean' ? displayForumTags : true;
        }
    }
};