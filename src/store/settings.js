import { IS_EXTENSION } from '../constants';

export default {
    namespaced: true,

    state: {
        displayTopicTags: true,

        highlightUserMessages: true,

        risibankOpen: true
    },

    mutations: {
        load(state) {
            if (IS_EXTENSION) {
                window.chrome.storage.local.get({ settings: null }, function (result) {
                    if (result.settings) {
                        state.displayTopicTags = result.settings.displayTopicTags;
                        state.highlightUserMessages = result.settings.highlightUserMessages;
                        state.risibankOpen = result.settings.risibankOpen;
                    }
                });
            } else {
                const displayTopicTags = localStorage.getItem('settings/displayTopicTags');
                if (displayTopicTags !== null) {
                    state.displayTopicTags = displayTopicTags === '1';
                }

                const highlightUserMessages = localStorage.getItem('settings/highlightUserMessages');
                if (highlightUserMessages !== null) {
                    state.highlightUserMessages = highlightUserMessages === '1';
                }

                const risibankOpen = localStorage.getItem('settings/risibankOpen');
                if (risibankOpen !== null) {
                    state.risibankOpen = risibankOpen === '1';
                }
            }
        },

        save(state) {
            if (IS_EXTENSION) {
                window.chrome.storage.local.set({ settings: state });
            } else {
                for (const key in state) {
                    localStorage.setItem(`settings/${key}`, state[key] ? '1' : '0');
                }
            }
        },

        setDisplayTopicTags(state, value) {
            state.displayTopicTags = value;
        },
        setHighlightUserMessages(state, value) {
            state.highlightUserMessages = value;
        },
        setRisibankOpen(state, value) {
            state.risibankOpen = value;
        }
    }
};