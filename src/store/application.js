export default {
    namespaced: true,

    state: {
        loading: false,
        displayForumTags: true,
        errorDialogOpen: false,
        errorDialogMessage: ''
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

        setDisplayForumTags(state, displayForumTags) {
            state.displayForumTags = typeof displayForumTags === 'boolean' ? displayForumTags : true;
        }
    }
};