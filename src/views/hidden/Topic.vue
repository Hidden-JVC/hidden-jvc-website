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
                    <v-col cols="12" lg="8">
                        <v-card outlined>
                            <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                                <v-toolbar-title>
                                    {{ topic.Topic.Title }}
                                </v-toolbar-title>
                            </v-toolbar>
                        </v-card>

                        <v-row no-gutters class="py-4" align="center">
                            <v-col cols="12" lg="3">
                                <v-btn v-if="userId !== null" @click="resetFicMode()" class="secondary mb-4" block small> Revenir sur le sujet </v-btn>
                                <v-btn color="primary" block small> Répondre </v-btn>
                            </v-col>

                            <v-col cols="12" lg="6">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopic()" dense />
                            </v-col>

                            <v-col cols="12" lg="3">
                                <v-btn @click="returnToForum()" class="secondary mb-4" block small> Liste des Sujets </v-btn>
                                <v-btn @click="fetchTopic()" class="secondary" block small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                        <v-row class="post-list">
                            <v-col cols="12" v-for="post of topic.Posts" :key="post.Post.Id">
                                <Post class="post-card" :post="post" :topic="topic" :forum="forum" @quote="quote" @reloadTopic="fetchTopic()" @fic-mode="ficMode" />
                            </v-col>
                        </v-row>

                        <v-row no-gutters align="center">
                            <v-col cols="12" lg="3">
                                <v-btn color="primary" block small> Répondre </v-btn>
                            </v-col>

                            <v-col cols="12" lg="6">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopic()" />
                            </v-col>

                            <v-col cols="12" lg="3">
                                <v-btn @click="fetchTopic()" class="secondary" block small> Actualiser </v-btn>
                            </v-col>
                        </v-row>

                        <v-card class="my-3" outlined>
                            <v-toolbar class="elevation-0" dense style="background-color: #303436;">
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

                    <v-col cols="12" lg="4">
                        <StatisticsMenu class="mb-4" :forumId="forum.Forum.Id" :topicId="topic.Topic.Id" />
                        <ModeratorsMenu class="mb-4" :moderators="forum.Moderators" />
                        <AnonymousMenu class="mb-4" v-if="$store.state.user.userId === null" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import TextEditor from '../../components/TextEditor';
import Post from '../../components/hidden/topic/Post';
import AnonymousMenu from '../../components/hidden/forum/AnonymousMenu';
import ModeratorsMenu from '../../components/hidden/forum/ModeratorsMenu';
import StatisticsMenu from '../../components/hidden/topic/StatisticsMenu';

export default {
    name: 'HiddenTopic',

    components: {
        Post,
        StatisticsMenu,
        TextEditor,
        AnonymousMenu,
        ModeratorsMenu
    },

    data: () => ({
        forum: null,
        topic: null,

        userId: null,

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

                const { topic } = await this.repos.hidden.getTopic(this.$route.params.topicId, this.page, this.userId);
                this.topic = topic;
                this.postsCount = this.topic.PostsCount;

                // const query = {
                //     page: this.page
                // };

                // if (this.firstRequest) {
                //     this.firstRequest = false;
                //     this.$router.replace({ query }).catch(() => { });
                // } else {
                //     this.$router.push({ query }).catch(() => { });
                // }
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
        },

        ficMode(userId) {
            this.userId = userId;
            this.fetchTopic();
        },

        resetFicMode() {
            this.userId = null;
            this.fetchTopic();
        },

        returnToForum() {
            this.$router.push(`/forums/${this.forum.Forum.Id}/hidden`);
        }
    },

    // watch: {
    //     '$route': function (to, from) {
    //         if (Object.keys(from.query).length > 0) {
    //             console.log('navigation reload');
    //             // this.fetchTopic();
    //         }
    //     }
    // },

    created() {
        // let { page } = this.$route.query;
        // if (page) {
        //     this.page = parseInt(page);
        // }

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