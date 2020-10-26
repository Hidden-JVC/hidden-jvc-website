<template>
    <v-row v-if="topic !== null" justify="center" no-gutters>
        <v-col cols="12" lg="9">
            <v-card class="pa-0 px-lg-4" outlined>

                <v-row class="px-4">
                    <v-col>
                        <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-card outlined>
                            <v-toolbar class="secondary elevation-0" dense>
                                <v-toolbar-title>
                                    {{ topic.Topic.Title }}
                                </v-toolbar-title>
                            </v-toolbar>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="8">
                        <v-row no-gutters align="center">
                            <v-col lg="3">
                                <v-btn color="primary" block small> Répondre </v-btn>
                            </v-col>

                            <v-col lg="6">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopic()" dense />
                            </v-col>

                            <v-col lg="3" class="text-right">
                                <v-btn @click="fetchTopic()" class="secondary" block small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" lg="8" class="px-0 px-lg-3 pt-0">
                        <v-row class="post-list">
                            <v-col cols="12" v-for="post of topic.Posts" :key="post.Post.Id">
                                <Post class="post-card" :post="post" :topic="topic" :forum="forum" v-on:quote="quote" v-on:reloadTopic="fetchTopic()" />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="px-0 px-lg-3">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopic()" />
                            </v-col>
                        </v-row>

                        <v-card class="mb-3" outlined>
                            <v-toolbar class="elevation-0" dense>
                                <v-toolbar-title>
                                    Répondre
                                </v-toolbar-title>
                            </v-toolbar>
                        </v-card>

                        <TextEditor ref="textEditor" v-model="content" />

                        <v-btn @click="createPost()" color="primary" small>
                            Répondre
                        </v-btn>
                    </v-col>

                    <v-col cols="12" lg="4" class="pt-0">
                        <v-row>
                            <v-col>
                                <TopicMenu class="mb-4" />
                                <AnonymousMenu class="mb-4" />
                                <ModeratorsMenu class="mb-4" :moderators="forum.Moderators" />
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
import AnonymousMenu from '../../components/hidden/forum/AnonymousMenu';
import ModeratorsMenu from '../../components/hidden/forum/ModeratorsMenu';
import TextEditor from '../../components/TextEditor';

export default {
    name: 'HiddenTopic',

    components: {
        Post,
        TopicMenu,
        TextEditor,
        AnonymousMenu,
        ModeratorsMenu
    },

    data: () => ({
        forum: null,
        topic: null,

        page: 1,
        limit: 20,
        postsCount: 0,

        content: ''
    }),

    computed: {
        breadcrumbs() {
            if (this.forum === null || this.topic === null) {
                return [];
            }

            return [
                { text: 'Forums', to: '/forums', exact: true },
                { text: this.forum.Forum.Name, to: `/forums/${this.forum.Forum.Id}`, exact: true },
                { text: 'Hidden', to: `/forums/${this.forum.Forum.Id}/hidden`, exact: true },
                { text: this.topic.Topic.Title, to: `/forums/${this.forum.Forum.Id}/hidden/${this.topic.Topic.Id}`, exact: true }
            ];
        },

        paginationLength() {
            let length = Math.ceil(this.postsCount / this.limit);
            if (length === 0 || isNaN(length)) {
                length = 1;
            }
            return length;
        }
    },

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
                this.postsCount = this.topic.PostsCount;
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

        async createPost() {
            try {
                this.setLoading(true);

                const topicId = parseInt(this.$route.params.topicId);
                await this.repos.hidden.createPost(topicId, this.content.trim(), this.$store.state.user.anonymousName);
                this.fetchTopic();
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

        quote(post) {
            const name = post.User ? post.User.Name : post.Post.Username;
            let content = `\n> Le ${this.$options.filters.postDate(post.Post.CreationDate)} ${name} a écrit: \n> `;
            content += post.Post.Content.split('\n').join('\n> ');
            content += '\n\n';

            this.$refs.textEditor.appendText(content);
        }
    },

    created() {
        this.fetchTopic();
    }
};
</script>

<style lang="scss" scoped>
.post-list {
    div:nth-child(odd) {
        .post-card {
            background-color: #181a1b;
        }
    }
    div:nth-child(even) {
        .post-card {
            background-color: #1e2021;
        }
    }
}
</style>