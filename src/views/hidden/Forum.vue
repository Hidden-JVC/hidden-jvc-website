<template>
    <v-row v-if="forum !== null" justify="center" no-gutters>
        <v-col cols="12" xl="9">
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
                                            Forum {{ forum.Name }}
                                        </v-toolbar-title>
                                    </v-toolbar>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row align="center">
                            <v-col cols="12" md="2">
                                <v-btn @click="focusNewTopic()" color="primary" block depressed small> Nouveau sujet </v-btn>
                            </v-col>

                            <v-col cols="12" md="8">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopics()" />
                            </v-col>

                            <v-col cols="12" md="2" class="text-right">
                                <v-btn @click="fetchTopics()" class="secondary" block depressed small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                        <v-row v-if="displayModerationTools">
                            <v-col offset="3" cols="6">
                                <v-select v-model="moderationAction" :items="moderationSelect" menu-props="offsetY" outlined dense>
                                    <template v-slot:append-outer>
                                        <v-btn @click="submitModerationAction()" color="secondary" depressed small>
                                            Valider
                                        </v-btn>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>

                        <TopicList v-model="selectedTopics" :forum="forum" :topics="topics" :displayModerationTools="displayModerationTools" />

                        <CreateTopicForm ref="createTopicForm" :tags="forum.Tags" />
                    </v-col>

                    <v-col cols="12" md="4">
                        <InformationsMenu class="mb-4" :forumId="forum.Id" :moderators="forum.Moderators" />
                        <UserListMenu :forumId="forum.Id" class="mb-4" />
                        <SearchMenu class="mb-4" @search="makeSearch" :tags="forum.Tags" />
                        <LogsCard class="mb-4" :forumId="forum.Id" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import LogsCard from '../../components/cards/LogsCard';
import SearchMenu from '../../components/hidden/forum/SearchMenu';
import UserListMenu from '../../components/hidden/forum/UserListMenu';
import InformationsMenu from '../../components/hidden/forum/InformationsMenu';

import CreateTopicForm from '../../components/hidden/forum/CreateTopicForm';
import TopicList from '../../components/hidden/forum/TopicList';

export default {
    name: 'Forum',

    components: {
        LogsCard,
        TopicList,
        SearchMenu,
        UserListMenu,
        InformationsMenu,
        CreateTopicForm
    },

    data: () => ({
        page: 1,
        limit: 20,

        forum: null,
        topics: [],
        topicsCount: 0,

        search: null,
        searchType: null,

        moderationAction: null,
        selectedTopics: []
    }),

    methods: {
        async fetchTopics() {

            try {
                this.setLoading(true);

                const start = performance.now();

                const query = {
                    forumId: this.$route.params.forumId,
                    page: this.page
                };

                if (this.search !== null && this.searchType !== null) {
                    query.search = this.search;
                    query.searchType = this.searchType;
                }

                const { forum, topics, count, error } = await this.repos.hidden.getTopics(query);

                const end = performance.now();
                this.$store.commit('application/pushLog', `Topics récupérés en ${(end - start) / 1000}s`);

                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.forum = forum;
                    this.topics = topics;
                    this.topicsCount = count;
                }
            } catch (err) {
                this.openErrorDialog('Une erreur est survenue lors de la récupération des topics');
                console.error(err);
            } finally {
                this.setLoading(false);
            }
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

                const { error } = await this.repos.hidden.topicsModeration(this.moderationAction, this.selectedTopics);
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    await this.fetchTopics();
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

        makeSearch(search, type) {
            this.search = search;
            this.searchType = type;
            this.fetchTopics();
        }
    },

    computed: {
        breadcrumbs() {
            if (this.forum === null || this.topic === null) {
                return [];
            }

            return [
                { text: 'Forums', to: '/forums', exact: true },
                { text: this.forum.Name, to: `/forums/${this.forum.Id}`, exact: true },
                { text: 'Hidden', to: `/forums/${this.forum.Id}/hidden`, exact: true }
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

            if (this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Id, 'Lock')) {
                list.push({ value: 'Lock', text: 'Lock' });
            }

            if (this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Id, 'UnLock')) {
                list.push({ value: 'UnLock', text: 'Délock' });
            }

            if (this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Id, 'Pin')) {
                list.push({ value: 'Pin', text: 'Epingler' });
            }

            if (this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Id, 'UnPin')) {
                list.push({ value: 'UnPin', text: 'Désépingler' });
            }

            if (this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Id, 'Delete')) {
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
