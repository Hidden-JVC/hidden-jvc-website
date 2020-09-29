<template>
    <v-row v-if="forum !== null" justify="center" no-gutters>
        <v-col cols="12" lg="9">
            <v-card class="pa-0 px-lg-4" outlined>
                <v-row class="px-4">
                    <v-col>
                        <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
                    </v-col>
                </v-row>

                <v-row class="px-4">
                    <v-col>
                        <h2 class="primary--text"> Forum {{ forum.Name }} </h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="8" class="px-0 px-lg-3">
                        <v-row class="px-4" align="center">
                            <v-col cols="12" md="3">
                                <v-btn color="primary" block small> Nouveau sujet </v-btn>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopics()" />
                            </v-col>

                            <v-col cols="12" md="3" class="text-right">
                                <v-btn class="secondary" block small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                        <TopicList :forum="forum" :topics="topics" />

                        <CreateTopicForm />
                    </v-col>

                    <v-col cols="12" md="4">
                        <!-- <v-card class="mb-4" outlined>
                            <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
                                Larry
                            </v-card-title>

                            <v-card-text class="pa-0" style="background-color: #444a4d;">
                                <v-img src="@/assets/larry.png" />
                            </v-card-text>
                        </v-card> -->

                        <ForumMenu class="mb-4" />

                        <AnonymousMenu class="mb-4" />

                        <ModeratorsMenu class="mb-4" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ForumMenu from '../components/forum/ForumMenu';
import AnonymousMenu from '../components/forum/AnonymousMenu';
import ModeratorsMenu from '../components/forum/ModeratorsMenu';

import CreateTopicForm from '../components/forum/CreateTopicForm';
import TopicList from '../components/forum/TopicList';

export default {
    name: 'Forum',

    components: {
        ModeratorsMenu,
        ForumMenu,
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
        ]
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
        }
    },

    computed: {
        breadcrumbs() {
            if (this.forum === null || this.topic === null) {
                return [];
            }

            return [
                { text: 'Forums', to: '/forums', exact: true },
                { text: this.forum.Name, to: `/forums/${this.forum.Id}`,exact: true },
                { text: 'Hidden', to: `/forums/${this.forum.Id}/hidden`,exact: true }
            ];
        },

        paginationLength() {
            let length = Math.ceil(this.topicsCount / this.limit);
            if (length === 0 || isNaN(length)) {
                length = 1;
            }
            return length;
        }
    },

    created() {
        this.fetchTopics();
    }
};
</script>
