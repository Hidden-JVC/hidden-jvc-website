<template>
    <v-row v-if="topic !== null" justify="center" no-gutters>
        <v-col cols="12" lg="9">
            <v-card class="pa-0 px-lg-4" outlined>

                <v-row class="px-4">
                    <v-col>
                        <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
                    </v-col>
                </v-row>

                <v-row class="px-4">
                    <v-col>
                        <h2 class="primary--text"> {{ topic.Topic.Title }} </h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" lg="8" class="px-0 px-lg-3">
                        <v-row>
                            <v-col cols="12" v-for="post of topic.Posts" :key="post.Post.Id">
                                <Post :post="post" />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <v-row>
                            <v-col>
                                <TopicMenu class="mb-4" />
                                <AnonymousMenu class="mb-4" />
                                <ModeratorsMenu class="mb-4" />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import TopicMenu from '../../components/hidden/topic/TopicMenu';
import Post from '../../components/hidden/topic/Post';
import AnonymousMenu from '../../components/forum/AnonymousMenu';
import ModeratorsMenu from '../../components/forum/ModeratorsMenu';

export default {
    name: 'HiddenTopic',

    components: {
        Post,
        TopicMenu,
        AnonymousMenu,
        ModeratorsMenu
    },

    data: () => ({
        forum: null,
        topic: null
    }),

    methods: {
        async fetchTopic() {
            try {
                this.setLoading(true);

                if (this.forum === null) {
                    const { forum } = await this.repos.hidden.getForum(this.$route.params.forumId);
                    this.forum = forum;
                }

                const { topic } = await this.repos.hidden.getTopic(this.$route.params.topicId, this.page);
                this.topic = topic;
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
                { text: this.forum.Name, to: `/forums/${this.forum.Id}`, exact: true },
                { text: 'Hidden', to: `/forums/${this.forum.Id}/hidden`, exact: true },
                { text: this.topic.Topic.Title, to: `/forums/${this.forum.Id}/hidden/${this.topic.Topic.Id}`, exact: true }
            ];
        }
    },

    created() {
        this.fetchTopic();
    }
};
</script>