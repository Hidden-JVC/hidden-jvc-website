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
                            <v-checkbox v-model="displayForumTags" label="Surligner mes posts en bleu" />
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
                            <v-checkbox v-model="displayForumTags" label="Afficher risibank par défaut" />
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
                return this.$store.state.application.displayForumTags;
            },

            set(displayForumTags) {
                return this.$store.commit('application/setDisplayForumTags', displayForumTags);
            }
        }
    }
};
</script>
