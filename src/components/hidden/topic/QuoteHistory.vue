<template>
    <v-dialog v-model="open" width="1000" scrollable>
        <template v-slot:activator="{ on }">
            <slot name="activator" v-bind="{ on }" />
        </template>

        <v-card>
            <v-toolbar class="elevation-0" dense style="background-color: #303436;">
                <v-toolbar-title>
                    Citations
                </v-toolbar-title>

                <v-btn @click="open = false" class="ml-auto" icon small>
                    <v-icon small> fas fa-times </v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="px-0 pb-1" style="max-height: 700px">
                <v-row class="post-list mx-0">
                    <v-col cols="12" v-for="post of posts" :key="post.Id">
                        <QuotedPost class="post-card" :post="post" />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'QuoteHistory',

    props: {
        postId: { required: true, type: Number }
    },

    components: {
        QuotedPost: () => import('./QuotedPost.vue')
    },

    data: () => ({
        open: false,
        quotesFetched: false,
        posts: []
    }),

    methods: {
        async fetchQuotes() {
            try {
                const start = performance.now();
                this.setLoading(true);

                const { posts, error } = await this.repos.hidden.getPostQuotes(this.postId);
                if (error) {
                    return this.openErrorDialog(error);
                } else {
                    this.posts = posts;
                }
                const end = performance.now();
                this.$store.commit('application/pushLog', `Citations récupérées en ${(end - start) / 1000}s`);
            } catch (err) {
                this.openErrorDialog('Une erreur est survenue lors de la récupération des citations');
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    watch: {
        open() {
            if (this.open && !this.quotesFetched) {
                this.quotesFetched = true;
                this.fetchQuotes();
            }
        }
    }
};
</script>
