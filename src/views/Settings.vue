<template>
    <v-container>

        <v-row justify="center">
            <v-col cols="4">
                <v-card outlined>
                    <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                        <v-toolbar-title>
                            Liste des sujets
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-row>
                            <v-checkbox v-model="displayForumTags" label="Afficher les tags" />
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="4">
                <v-card outlined>
                    <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                        <v-toolbar-title>
                            Topic
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-row>
                            <v-checkbox v-model="highlightUserMessages" label="Mettre en valeur mes messages" />
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="4">
                <v-card outlined>
                    <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                        <v-toolbar-title>
                            Editeur
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-row>
                            <v-checkbox v-model="risibankOpen" label="Afficher risibank par défaut" />
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="4">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'Settings',

    computed: {
        displayForumTags: {
            get() {
                return this.$store.state.settings.displayTopicTags;
            },

            set(displayForumTags) {
                this.$store.commit('settings/setDisplayTopicTags', displayForumTags);
                this.$store.commit('settings/save');
            }
        },

        highlightUserMessages: {
            get() {
                return this.$store.state.settings.highlightUserMessages;
            },

            set(highlightUserMessages) {
                this.$store.commit('settings/setHighlightUserMessages', highlightUserMessages);
                this.$store.commit('settings/save');
            }
        },

        risibankOpen: {
            get() {
                return this.$store.state.settings.risibankOpen;
            },

            set(risibankOpen) {
                this.$store.commit('settings/setRisibankOpen', risibankOpen);
                this.$store.commit('settings/save');
            }
        }
    }
};
</script>
