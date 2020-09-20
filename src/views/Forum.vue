<template>
    <v-row v-if="forum !== null" justify="center" no-gutters>
        <v-col cols="8">
            <v-card class="pa-4">
                <v-row>
                    <v-col>
                        <h2 class="orange--text"> Forum {{ forum.Name }} </h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="9">
                        <v-row align="center">
                            <v-col cols="3">
                                <v-btn color="orange darken-4" small> Nouveau sujet </v-btn>
                            </v-col>

                            <v-col cols="6">
                                <v-row align="center">
                                    <v-col cols="6">
                                        <v-text-field placeholder="Rechercher dans le forum" dense outlined hide-details />
                                    </v-col>

                                    <v-col cols="4">
                                        <v-select placeholder="Sujet" dense outlined hide-details />
                                    </v-col>

                                    <v-col cols="2">
                                        <v-btn small>
                                            <v-icon small> fas fa-search </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="3" class="text-right">
                                <v-btn small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                        <v-simple-table dense id="forum-table">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th style="width:1%"> </th>
                                        <th style="width: 70%"> Sujet </th>
                                        <th> Auteur </th>
                                        <th> Nb </th>
                                        <th> Dernier msg </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="topic of topics" :key="topic.Id">
                                        <td>
                                            <template v-if="topic.Topic.Pinned">
                                                <template v-if="topic.Topic.Locked">
                                                    <v-img src="@/assets/topic-marque-off.png" width="16" />
                                                </template>
                                                <template v-else>
                                                    <v-img src="@/assets/topic-marque-on.png" width="16" />
                                                </template>
                                            </template>

                                            <template v-else>
                                                <template v-if="topic.Topic.Locked">
                                                    <v-img src="@/assets/topic-lock.png" width="16" />
                                                </template>
                                                <template v-else>
                                                    <template v-if="topic.PostsCount >= 20">
                                                        <v-img src="@/assets/topic-dossier2.png" width="16" />
                                                    </template>
                                                    <template v-else>
                                                        <v-img src="@/assets/topic-dossier1.png" width="16" />
                                                    </template>
                                                </template>
                                            </template>

                                        </td>

                                        <td>
                                            {{ topic.Topic.Title }}
                                        </td>

                                        <td :class="getUserClass(topic.Author)">
                                            {{ getUsernameFromTopic(topic) }}
                                        </td>

                                        <td>
                                            {{ topic.PostsCount }}
                                        </td>

                                        <td>
                                            {{ topic.LastPostDate | topicLastPostDate() }}
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>

                    <v-col cols="3">
                        <v-card outlined>
                            <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
                                Infos

                                <span class="ml-auto">
                                    <v-icon x-small> fa fa-users </v-icon>
                                    0 connecté(s)
                                </span>
                            </v-card-title>

                            <v-card-text class="pa-0" style="background-color: #444a4d;">
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title> Gestion du forum </v-list-item-title>
                                            <v-list-item-subtitle style="white-space: normal">
                                                Modérateurs:
                                                <span style="color: white">
                                                    Suumas Menchov-Giro Love-n-peace odoki LikeGod [FIREWORK]
                                                </span>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Topic',

    data: () => ({
        loading: true,

        quickSearch: null,
        filtersToggled: true,

        titleFilter: null,
        userFilter: null,

        page: 1,
        limit: 20,
        sortBy: 'CreationDate',
        orderBy: 'ASC',

        resetPage: false, // wether or not to reset the page to 1 when fetching the next sales

        pagesCount: 1,

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

            const { forum } = await this.repos.forum.getForum(this.$route.params.forumId);
            this.forum = forum;
            const { topics } = await this.repos.forum.getTopics(this.$route.params.forumId, this.page);
            this.topics = topics;

            this.loading = false;
        },

        getUserClass(user) {
            if (user === null) {
                return 'anonymous-user';
            } else if (user.IsAdmin) {
                return 'admin-user';
            } else if (user.IsModerator) {
                return 'moderator-user';
            } else {
                return 'registered-user';
            }
        },

        getUsernameFromTopic(topic) {
            if (topic.Author === null) {
                return topic.Topic.Username;
            } else {
                return topic.Author.Name;
            }
        }
    },

    created() {
        this.fetchTopics();
    }
};
</script>

<style lang="scss" scoped>
#forum-table::v-deep {
    table tbody {
        tr:nth-child(even) {
            background-color: #181a1b;
        }

        tr:nth-child(odd) {
            background-color: #1e2021;
        }

        tr {
            td {
                border-bottom: 0;

                &:first-child {
                    padding: 0px 5px;
                }

                &:nth-child(2) {
                    padding: 0px 5px;
                    cursor: pointer;
                }

                &:nth-child(2),
                &:nth-child(5) {
                    color: #4baeff;
                }
            }

            td.admin-user {
                color: red;
            }

            td.moderator-user {
                color: green;
            }

            td.registered-user {
                color: #4baeff;
            }
        }
    }
}
</style>