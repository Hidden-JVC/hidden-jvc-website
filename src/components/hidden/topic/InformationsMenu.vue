<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Informations

            <template v-if="!displayTagsEdit">
                <v-chip class="ml-2" v-for="tag of topic.Tags" :key="tag.Name" :color="tag.Color" label small>
                    {{ tag.Name }} <v-icon v-if="tag.Locked" x-small right> fas fa-lock </v-icon>
                </v-chip>
            </template>
        </v-card-title>

        <v-card-text class="pt-4">
            <template v-if="displayTagsEdit">
                <TagsSelect v-model="selectedTags" :tags="forum.Tags" placeholder="Modifier les tags du topic" class="mt-2 mb-4" />
            </template>

            <template v-if="displayUpdateTagsButton">
                <br v-if="!displayTagsEdit"> <br v-if="!displayTagsEdit">

                <v-btn @click="displayTagsEdit = true" v-show="!displayTagsEdit" color="primary" small depressed> Modifier </v-btn>
                <v-btn @click="submitTags()" v-show="displayTagsEdit" color="primary" class="mr-4" small depressed> Enregistrer </v-btn>
                <v-btn @click="displayTagsEdit = false" v-show="displayTagsEdit" color="secondary" small depressed> Annuler </v-btn>
            </template>

            <template v-if="moderators.length > 0">
                Modérateurs:

                <span v-for="(moderator, i) of moderators" :key="moderator.Id">
                    <router-link :to="`/users/${moderator.Name}`" class="no-text-decoration grey--text">
                        {{ moderator.Name }}
                    </router-link>
                    <span v-if="i !== moderators.length - 1">, </span>
                </span>
            </template>
            <template v-else>
                Aucun modérateurs
            </template>

            <Logs />
        </v-card-text>
    </v-card>
</template>

<script>
import Logs from '../../misc/Logs';
import TagsSelect from '../../widgets/TagsSelect';

export default {
    name: 'InformationsMenu',

    components: {
        Logs,
        TagsSelect
    },

    props: {
        forum: { required: true, type: Object },
        topic: { required: true, type: Object },
        moderators: { required: true, type: Array }
    },

    data: () => ({
        displayTagsEdit: false,
        selectedTags: []
    }),

    methods: {
        async submitTags() {
            try {
                this.setLoading(true);

                const topicId = parseInt(this.$route.params.topicId);
                const { error } = await this.repos.hidden.updateTopic(topicId, { tags: this.selectedTags.map((t) => ({ id: t })) });
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.$emit('reload-topic');
                    this.displayTagsEdit = false;
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    computed: {
        displayUpdateTagsButton() {
            return this.isAdmin ||
                this.$store.getters['user/hasRightOnForum'](this.forum.Id, 'ModifyTag') ||
                this.topic.Author && this.topic.Author.Id === this.$store.state.user.userId;
        }
    },

    created() {
        this.selectedTags = this.topic.Tags;
    }
};
</script>