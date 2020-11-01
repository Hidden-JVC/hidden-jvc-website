<template>
    <v-row v-if="forum !== null" justify="center" no-gutters>
        <v-col cols="12" lg="9">
            <v-card class="pa-0 px-lg-4" outlined>
                <v-row>
                    <v-col>
                        <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="8" class="px-0 px-lg-3">
                        <v-row>
                            <v-col class="pt-0">
                                <v-card outlined>
                                    <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                                        <v-toolbar-title>
                                            Forum {{ forum.Forum.Name }}
                                        </v-toolbar-title>
                                    </v-toolbar>
                                </v-card>
                                <!-- <h2 class="primary--text"> Forum {{ forum.Forum.Name }} </h2> -->
                            </v-col>
                        </v-row>

                        <v-row align="center">
                            <v-col cols="12" md="3">
                                <v-btn @click="focusNewTopic()" color="primary" block small> Nouveau sujet </v-btn>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopics()" />
                            </v-col>

                            <v-col cols="12" md="3" class="text-right">
                                <v-btn @click="fetchTopics()" class="secondary" block small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                        <v-row v-if="displayModerationTools">
                            <v-col offset="3" cols="6">
                                <v-select v-model="moderationAction" :items="moderationSelect" menu-props="offsetY" outlined dense>
                                    <template v-slot:append-outer>
                                        <v-btn @click="submitModerationAction()" color="secondary" small>
                                            Valider
                                        </v-btn>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>

                        <TopicList v-model="selectedTopics" :forum="forum" :topics="topics" :displayModerationTools="displayModerationTools" />

                        <CreateTopicForm ref="createTopicForm" />
                    </v-col>

                    <v-col cols="12" md="4">
                        <StatisticsMenu class="mb-4" :forumId="forum.Forum.Id" />

                        <ModeratorsMenu class="mb-4" :moderators="forum.Moderators" />

                        <AnonymousMenu class="mb-4" v-if="$store.state.user.userId === null" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import StatisticsMenu from '../../components/hidden/forum/StatisticsMenu';
import AnonymousMenu from '../../components/hidden/forum/AnonymousMenu';
import ModeratorsMenu from '../../components/hidden/forum/ModeratorsMenu';

import CreateTopicForm from '../../components/hidden/forum/CreateTopicForm';
import TopicList from '../../components/hidden/forum/TopicList';

export default {
    name: 'Forum',

    components: {
        ModeratorsMenu,
        StatisticsMenu,
        CreateTopicForm,
        TopicList,
        AnonymousMenu
    },

    data: () => ({
        loading: true,

        page: 1,
        limit: 20,

        forum: null,
        topics: [],
        topicsCount: 0,

        sortSelect: [
            { text: 'Sujet', value: 'Title' },
            { text: 'Nombre de posts', value: 'postsCount' },
            { text: 'Dernier message', value: 'lastPostDate' }
        ],

        moderationAction: null,
        selectedTopics: []
    }),

    methods: {
        async fetchTopics() {
            this.loading = true;
            this.setLoading(true);

            if (this.forum === null) {
                const { forum } = await this.repos.hidden.getForum(this.$route.params.forumId);
                this.forum = forum;
            }

            const { topics, count } = await this.repos.hidden.getTopics(this.$route.params.forumId, this.page);
            this.topics = topics;
            this.topicsCount = count;

            this.setLoading(false);
            this.loading = false;
        },

        focusNewTopic() {
            this.$refs.createTopicForm.$refs.title.focus();
            this.$refs.createTopicForm.$refs.title.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },

        async submitModerationAction() {
            try {
                this.setLoading(true);

                if (this.selectedTopics.length === 0) {
                    return;
                }

                if (this.moderationAction === null) {
                    return;
                }

                const { success } = await this.repos.hidden.topicsModeration(this.moderationAction, this.selectedTopics);
                if (success) {
                    await this.fetchTopics();
                } else {
                    throw new Error('api error');
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    computed: {
        breadcrumbs() {
            if (this.forum === null || this.topic === null) {
                return [];
            }

            return [
                { text: 'Forums', to: '/forums', exact: true },
                { text: this.forum.Forum.Name, to: `/forums/${this.forum.Forum.Id}`, exact: true },
                { text: 'Hidden', to: `/forums/${this.forum.Forum.Id}/hidden`, exact: true }
            ];
        },

        paginationLength() {
            let length = Math.ceil(this.topicsCount / this.limit);
            if (length === 0 || isNaN(length)) {
                length = 1;
            }
            return length;
        },

        moderationSelect() {
            const list = [];

            if (this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'Lock')) {
                list.push({ value: 'Lock', text: 'Lock' });
            }

            if (this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'UnLock')) {
                list.push({ value: 'UnLock', text: 'Délock' });
            }

            if (this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'Pin')) {
                list.push({ value: 'Pin', text: 'Epingler' });
            }

            if (this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'UnPin')) {
                list.push({ value: 'UnPin', text: 'Désépingler' });
            }

            if (this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'Delete')) {
                list.push({ value: 'Delete', text: 'Supprimer' });
            }

            return list;
        },

        displayModerationTools() {
            return this.isAdmin || this.$store.getters['user/isModeratorOnForum'](51);
        }
    },

    created() {
        this.fetchTopics();
    }
};
</script>
