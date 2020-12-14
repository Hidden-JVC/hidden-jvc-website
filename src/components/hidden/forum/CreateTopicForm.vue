<template>
    <v-row>
        <v-col>
            <ValidationObserver ref="observer">
                <v-card class="mt-1 mb-5" outlined>
                    <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                        <v-toolbar-title>
                            Nouveau sujet
                        </v-toolbar-title>
                    </v-toolbar>
                </v-card>

                <ValidationProvider v-slot="{ errors, failed }" name="Titre" rules="required">
                    <v-text-field v-model.trim="title" ref="title" placeholder="Saisir le titre du sujet" :hide-details="!failed" :error-messages="errors" outlined dense />
                </ValidationProvider>

                <v-row align="center">
                    <v-col cols="8">
                        <v-btn color="secondary" small depressed> Ajouter un sondage </v-btn>
                    </v-col>

                    <v-col cols="4">
                        <TagsSelect v-model="selectedTags" :tags="tags" placeholder="Associer des tags au sujet" />
                    </v-col>
                </v-row>

                <TextEditor v-model.trim="content" />

                <v-btn color="primary" small depressed @click="createTopic()"> Poster </v-btn>
            </ValidationObserver>
        </v-col>
    </v-row>
</template>

<script>
import TextEditor from '../../TextEditor';
import TagsSelect from '../../widgets/TagsSelect';

export default {
    name: 'CreateTopicForm',

    components: {
        TextEditor,
        TagsSelect
    },

    props: {
        tags: { type: Array, default: () => [] }
    },

    data: () => ({
        title: '',
        selectedTags: [],
        content: ''
    }),

    methods: {
        async createTopic() {
            try {
                const valid = await this.$refs.observer.validate();
                if (!valid) {
                    return;
                }

                this.setLoading(true);
                const forumId = parseInt(this.$route.params.forumId);
                const { topicId, error } = await this.repos.hidden.createTopic(forumId, this.title, this.selectedTags, this.content.trim(), this.$store.state.user.anonymousName);
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.$router.push(`/forums/${forumId}/hidden/${topicId}`);
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    }
};
</script>
