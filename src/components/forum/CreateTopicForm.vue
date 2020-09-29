<template>
    <v-row class="px-4">
        <v-col>
            <ValidationObserver ref="observer">
                <h2 class="primary--text"> Nouveau sujet </h2>

                <ValidationProvider v-slot="{ errors }" name="Titre" rules="required">
                    <v-text-field v-model="title" placeholder="Saisir le titre du sujet" class="my-4" :error-messages="errors" outlined dense />
                </ValidationProvider>

                <v-card class="mb-4" outlined>
                    <v-card-title>
                        <v-btn-toggle class="mr-4 mb-2 mb-lg-0">
                            <v-btn small>
                                <v-icon small> fas fa-bold </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-italic </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-underline </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-strikethrough </v-icon>
                            </v-btn>
                        </v-btn-toggle>

                        <v-btn-toggle class="mr-4 mb-2 mb-lg-0">
                            <v-btn small>
                                <v-icon small> fas fa-list-ul </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-list-ol </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-quote-left </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-code </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-eye-slash </v-icon>
                            </v-btn>
                        </v-btn-toggle>

                        <v-btn-toggle class="mr-4 mb-2 mb-lg-0">
                            <v-btn small>
                                <v-icon small> fas fa-smile </v-icon>
                            </v-btn>
                            <v-btn small>
                                <v-icon small> fas fa-image </v-icon>
                            </v-btn>
                        </v-btn-toggle>

                        <v-img src="@/assets/risibank.png" width="96.25" height="17.5" contain @click="showRisibank = !showRisibank" />
                    </v-card-title>

                    <div v-show="showRisibank">
                        <v-divider />

                        <v-tabs v-model="risibankTab" fixed-tabs>
                            <v-tab> Favoris </v-tab>
                            <v-tab> Populaire </v-tab>
                            <v-tab> Hasard </v-tab>
                            <v-tab> Récent </v-tab>
                            <v-tab> Hot </v-tab>
                            <v-tab> Recherche </v-tab>
                        </v-tabs>

                        <v-divider />

                        <v-row class="mx-0 stickers-container">
                            <v-col v-for="sticker of stickers" :key="sticker.id" cols="3" lg="2" class="text-center">
                                <v-hover v-slot:default="{ hover }">
                                    <v-img :src="sticker.risibank_link" width="70" height="55" @click.passive="addSticker(sticker)">
                                        <v-row v-show="hover" align="end" class="fill-height">
                                            <v-col class="pb-0 mr-1 text-right">
                                                <v-icon color="yellow" x-small> fas fa-star </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-img>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>

                <ValidationProvider v-slot="{ errors }" name="Message" rules="required">
                    <v-textarea v-model="content" ref="textarea" :error-messages="errors" counter outlined />
                </ValidationProvider>

                <v-card class="mb-4" outlined>
                    <div class="preview" v-html="preview"> </div>
                </v-card>

                <v-btn color="primary" @click="createTopic()"> Poster </v-btn>
            </ValidationObserver>
        </v-col>
    </v-row>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

export default {
    name: 'CreateTopicForm',

    data: () => ({
        risibankTab: 1,
        risibank: null,
        showRisibank: true,

        title: '',
        content: ''
    }),

    computed: {
        stickers() {
            if (this.risibank === null) {
                return [];
            } else {
                switch (this.risibankTab) {
                    case 0:
                        return [];
                    case 1:
                        return this.risibank.views;
                    case 2:
                        return this.risibank.random;
                    case 3:
                        return this.risibank.tms;
                    case 4:
                        return this.risibank.trending;
                    case 5:
                        return [];
                    default:
                        return [];
                }
            }
        },

        preview() {
            return parse(this.content);
        }
    },

    methods: {
        async fetchRisibank() {
            const response = await fetch('https://api.risibank.fr/api/v0/load');
            const result = await response.json();
            this.risibank = result.stickers;

            // const response = await fetch('https://api.risibank.fr/api/v0/search', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ search: 'jesus' })
            // });
            // const result = await response.json();
            // this.stickers = result.stickers;
        },

        addSticker(sticker) {
            const textarea = this.$refs.textarea.$refs.input;

            if (textarea.selectionStart || textarea.selectionStart == '0') {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                const before = textarea.value.substring(0, start);
                // const selected = textarea.value.substring(start, end);
                const after = textarea.value.substring(end, textarea.value.length);


                this.content = `${before} ${sticker.risibank_link} ${after}`;

                setTimeout(() => {
                    textarea.focus();
                    const cursorPosition = before.length + sticker.risibank_link.length + 1;
                    textarea.setSelectionRange(cursorPosition, cursorPosition);
                }, 0);


            } else {
                this.content += sticker.risibank_link;
                textarea.focus();
            }
        },

        async createTopic() {
            try {
                const valid = await this.$refs.observer.validate();
                if (!valid) {
                    return;
                }

                this.setLoading(true);
                const forumId = parseInt(this.$route.params.forumId);
                const { topicId, error } = await this.repos.forum.createTopic(forumId, this.title, this.content, this.$store.state.user.anonymousName);
                if (error) {
                    throw new Error(error);
                }
                this.$router.push(`/forums/${forumId}/${topicId}`);
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    created() {
        this.fetchRisibank();
    }
};
</script>

<style lang="scss" scoped>
.stickers-container {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 158px;
}

.preview {
    height: 158px;
    padding: 5px;
}
</style>