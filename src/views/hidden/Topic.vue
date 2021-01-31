<template>
    <v-row v-if="topic !== null" justify="center" no-gutters>
        <v-col cols="12" xl="9">
            <v-card class="pa-0 px-lg-4" outlined>
                <v-row class="px-4">
                    <v-col>
                        <v-breadcrumbs class="pa-0" :items="breadcrumbs" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" lg="8" class="pt-0">
                        <v-card class="my-3" outlined>
                            <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                                <template v-if="!displayTitleInput">
                                    <v-toolbar-title>
                                        {{ topic.Topic.Title }}
                                    </v-toolbar-title>

                                    <v-btn v-if="displayUpdateTitleButton" @click="displayTitleInput = true" color="primary" class="ml-auto" depressed small>
                                        Modifier
                                    </v-btn>
                                </template>

                                <v-text-field v-if="displayTitleInput" v-model.trim="titleInput" hide-details outlined dense>
                                    <template v-slot:append-outer>
                                        <v-btn @click="updateTitle()" color="primary" class="ml-auto mr-2" depressed small>
                                            Enregistrer
                                        </v-btn>

                                        <v-btn @click="displayTitleInput = false" color="secondary" depressed small>
                                            Annuler
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-toolbar>
                        </v-card>

                        <v-row no-gutters align="center">
                            <v-col cols="12" lg="2">
                                <v-btn color="primary" @click="focusResponseForm()" depressed block small> Répondre </v-btn>
                                <v-btn v-if="userId !== null" @click="resetFicMode()" class="secondary mt-4" depressed block small> Revenir sur le sujet </v-btn>
                            </v-col>

                            <v-col cols="12" lg="8">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopic()" dense />
                            </v-col>

                            <v-col cols="12" lg="2">
                                <v-btn @click="returnToForum()" class="secondary" depressed block small> Liste des Sujets </v-btn>
                            </v-col>
                        </v-row>

                        <v-row class="post-list">
                            <v-col cols="12" v-for="post of topic.Posts" :key="post.Post.Id">
                                <Post class="post-card" :post="post" :topic="topic" :forum="forum" :isPemt="pemtPosts.includes(post.Post.Id)" @quote="quote" @reloadTopic="fetchTopic()" @fic-mode="ficMode" />
                            </v-col>
                        </v-row>

                        <v-row no-gutters align="center">
                            <v-col cols="12" lg="2">
                                <v-btn @click="fetchTopic()" class="secondary" depressed block small> Actualiser </v-btn>
                            </v-col>

                            <v-col cols="12" lg="8">
                                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchTopic()" dense />
                            </v-col>

                            <v-col cols="12" lg="2">
                                <v-btn @click="returnToForum()" class="secondary" depressed block small> Liste des Sujets </v-btn>
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

                        <v-btn @click="createPost()" color="primary" depressed small>
                            Répondre
                        </v-btn>
                    </v-col>

                    <v-col cols="12" lg="4">
                        <InformationsMenu class="mb-4" :forum="forum" :topic="topic" :moderators="forum.Moderators" @reload-topic="fetchTopic()" />
                        <UserListMenu :forumId="forum.Forum.Id" class="mb-4" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import TextEditor from '../../components/TextEditor';
import Post from '../../components/hidden/topic/Post';
import UserListMenu from '../../components/hidden/forum/UserListMenu';
import InformationsMenu from '../../components/hidden/topic/InformationsMenu';

export default {
    name: 'HiddenTopic',

    components: {
        Post,
        TextEditor,
        UserListMenu,
        InformationsMenu
    },

    data: () => ({
        forum: null,
        topic: null,

        userId: null,
        disableNavigation: false,

        page: 1,
        limit: 20,
        postsCount: 0,

        content: '',

        displayTitleInput: false,
        titleInput: ''
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
        },

        displayUpdateTitleButton() {
            return this.topic.Author && this.topic.Author.Id === this.$store.state.user.userId;
        },

        pemtPosts() {
            const map = {};

            for (const post of this.topic.Posts) {
                const date = new Date(post.Post.CreationDate);
                const seconds = Math.floor(date.getTime() / 1000);
                if (!Object.prototype.hasOwnProperty.call(map, seconds)) {
                    map[seconds] = [];
                }
                map[seconds].push(post.Post.Id);
            }

            let posts = [];

            for (const key in map) {
                if (map[key].length > 1) {
                    posts = [...posts, ...map[key]];
                }
            }

            return posts;
        }
    },

    methods: {
        buildQuery() {
            const query = {};

            if (this.page !== 1) {
                query.page = this.page;
            }

            if (this.userId !== null) {
                query.userId = this.userId;
            }

            return query;
        },

        doPush(query) {
            return (Object.keys(query).length !== Object.keys(this.$route.query).length) || !Object.keys(query).every((key) => query[key] === this.$route.query[key]);
        },

        parseQuery(query) {
            this.page = parseInt(query.page) || 1;
            this.userId = parseInt(query.userId) || null;
        },

        async fetchTopic(push = true) {
            try {
                const start = performance.now();
                this.setLoading(true);
                this.disableNavigation = true;

                const query = this.buildQuery();
                if (push && this.doPush(query)) {
                    this.$router.push({ query });
                }

                if (this.forum === null) {
                    const { forum, error } = await this.repos.hidden.getForum(this.$route.params.forumId);
                    if (error) {
                        return this.openErrorDialog(error);
                    } else {
                        this.forum = forum;
                    }
                }

                const { topic, error } = await this.repos.hidden.getTopic(this.$route.params.topicId, this.page, this.userId);
                if (error) {
                    return this.openErrorDialog(error);
                } else {
                    this.topic = topic;
                    this.titleInput = topic.Topic.Title;
                    this.postsCount = this.topic.PostsCount;
                }
                const end = performance.now();
                this.$store.commit('application/pushLog', `Messages récupérés en ${(end - start) / 1000}s`);
            } catch (err) {
                this.openErrorDialog('Une erreur est survenue lors de la récupération du topic');
                console.error(err);
            } finally {
                this.setLoading(false);
                this.disableNavigation = false;
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
        },

        focusResponseForm() {
            this.$refs.textEditor.$refs.textarea.focus();
            this.$refs.textEditor.$refs.textarea.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },

        async updateTitle() {
            try {
                this.setLoading(true);

                const topicId = parseInt(this.$route.params.topicId);
                const { error } = await this.repos.hidden.updateTopic(topicId, { title: this.titleInput });
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.fetchTopic();
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    watch: {
        $route(to) {
            if (!this.disableNavigation) {
                this.parseQuery(to.query);
                this.fetchTopic(false);
            }
        }
    },

    created() {
        this.parseQuery(this.$route.query);
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