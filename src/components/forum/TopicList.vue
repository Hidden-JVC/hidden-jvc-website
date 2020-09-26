<template>
    <div>
        <v-simple-table v-if="!$vuetify.breakpoint.mobile" dense id="forum-table">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th style="width:1%"> </th>
                        <th style="width: 70%"> SUJET </th>
                        <th> AUTEUR </th>
                        <th> NB </th>
                        <th> DERNIER MSG </th>
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
                            <a :href="`/#/forums/${forum.Id}/${topic.Topic.Id}`">
                                {{ topic.Topic.Title }}
                            </a>
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

        <v-list id="forum-list" v-if="this.$vuetify.breakpoint.mobile">
            <v-list-item v-for="topic of topics" :key="topic.Id">
                <v-list-item-icon>
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
                </v-list-item-icon>

                <v-list-item-content class="pb-2">
                    <v-list-item-title class="mb-4">
                        <a :href="`/#/forums/${forum.Id}/${topic.Topic.Id}`">
                            {{ topic.Topic.Title }}
                        </a>
                        <span style="color: #748491">
                            ({{ topic.PostsCount }})
                        </span>

                    </v-list-item-title>

                    <v-list-item-subtitle>
                        <span :class="getUserClass(topic.Author)">
                            {{ getUsernameFromTopic(topic) }}
                        </span>

                        <span class="float-right mr-4">
                            {{ topic.LastPostDate | topicLastPostDate() }}
                        </span>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
    name: 'TopicList',

    props: {
        forum: { required: true },
        topics: { required: true, type: Array }
    },

    methods: {
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
        },

        openTopic(topicId) {
            alert(topicId);
        }
    }
};
</script>

<style lang="scss" scoped>
.admin-user {
    color: red;
}

.moderator-user {
    color: green;
}

.registered-user {
    color: #4baeff;
}

#forum-list::v-deep {
    .v-list-item__title a {
        color: #4baeff;
        text-decoration: none;
        white-space: normal;
    }

    .v-list-item__title a:visited {
        color: #748491;
    }

    .v-list-item:nth-child(odd) {
        background-color: #181a1b;
    }

    .v-list-item:nth-child(even) {
        background-color: #1e2021;
    }
}

#forum-table::v-deep {
    table tbody {
        tr:nth-child(odd) {
            background-color: #181a1b;
        }

        tr:nth-child(even) {
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

                &:nth-child(2) a {
                    color: #4baeff;
                    text-decoration: none;

                    &:visited {
                        color: #748491;
                    }
                }

                &:nth-child(5) {
                    color: #4baeff;
                }
            }
        }
    }
}
</style>