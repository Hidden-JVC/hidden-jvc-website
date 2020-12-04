<template>
    <div>
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

                <v-img src="@/assets/risibank.png" width="96.25" height="17.5" class="cursor-pointer" contain @click="showRisibank = !showRisibank" />
            </v-card-title>

            <v-expand-transition>
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

                    <v-expand-transition>
                        <div v-show="risibankTab === 5">
                            <v-divider />

                            <v-row class="px-3">
                                <v-col>
                                    <v-text-field v-model="risibankSearch" @keydown.enter="fetchRisibankSearch()" outlined hide-details dense>
                                        <template v-slot:append-outer>
                                            <v-btn color="secondary" @click="fetchRisibankSearch()" small> Rechercher </v-btn>
                                        </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </div>
                    </v-expand-transition>

                    <v-divider />

                    <v-row class="mx-0 stickers-container">
                        <v-col v-for="sticker of stickers" :key="sticker.id" cols="3" lg="2">
                            <v-hover v-slot:default="{ hover }">
                                <v-img v-if="risibankTab === 0" :src="sticker" width="70" height="55" @click.passive="addSticker(sticker)" class="mx-auto cursor-pointer">
                                    <v-row v-show="hover" align="end" class="fill-height">
                                        <v-col class="pb-0 mr-1 text-right">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-icon @click.stop="removeSticker(sticker)" color="red" small v-on="on">
                                                        fas fa-trash
                                                    </v-icon>
                                                </template>
                                                Supprimer des favoris
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                </v-img>
                                <v-img v-else :src="sticker.risibank_link" width="70" height="55" @click.passive="addSticker(sticker.risibank_link)" class="mx-auto cursor-pointer">
                                    <v-row v-show="hover" align="end" class="fill-height">
                                        <v-col class="pb-0 mr-1 text-right">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-icon @click.stop="saveSticker(sticker)" color="yellow" small v-on="on">
                                                        fas fa-star
                                                    </v-icon>
                                                </template>
                                                Ajouter aux favoris
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                </v-img>
                            </v-hover>
                        </v-col>
                    </v-row>
                </div>
            </v-expand-transition>
        </v-card>

        <ValidationProvider v-slot="{ errors }" name="Message" rules="required">
            <v-textarea v-model="content" @change="$emit('input', content)" ref="textarea" :error-messages="errors" counter outlined />
        </ValidationProvider>

        <v-card class="mb-4" outlined>
            <div class="preview" v-html="preview"> </div>
        </v-card>
    </div>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

export default {
    name: 'TextEditor',

    props: {
        value: { type: String, required: true }
    },

    data() {
        return {
            content: this.value,
            risibankTab: 1, // favorite tab
            risibank: null,
            showRisibank: true,
            risibankSearchResult: null,
            risibankSearch: ''
        };
    },

    computed: {
        stickers() {
            if (this.risibank === null) {
                return [];
            } else {
                switch (this.risibankTab) {
                    case 0:
                        return this.$store.state.user.favoriteStickers;
                    case 1:
                        return this.risibank.views;
                    case 2:
                        return this.risibank.random;
                    case 3:
                        return this.risibank.tms;
                    case 4:
                        return this.risibank.trending;
                    case 5:
                        return this.risibankSearchResult;
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
        },

        async fetchRisibankSearch() {
            try {
                this.setLoading(true);

                const response = await fetch('https://api.risibank.fr/api/v0/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ search: this.risibankSearch })
                });
                const result = await response.json();
                this.risibankSearchResult = result.stickers;
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

        appendText(text) {
            this.content += text;
        },

        addSticker(stickerUrl) {
            const textarea = this.$refs.textarea.$refs.input;

            if (textarea.selectionStart || textarea.selectionStart == '0') {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                const before = textarea.value.substring(0, start);
                // const selected = textarea.value.substring(start, end);
                const after = textarea.value.substring(end, textarea.value.length);

                this.content = `${before} ${stickerUrl} ${after}`;

                setTimeout(() => {
                    textarea.focus();
                    const cursorPosition = before.length + stickerUrl.length + 1;
                    textarea.setSelectionRange(cursorPosition, cursorPosition);
                }, 0);
            } else {
                this.content += stickerUrl;
                textarea.focus();
            }

            this.$emit('input', this.content);
        },

        saveSticker(sticker) {
            this.$store.commit('user/addFavoriteStickers', sticker.risibank_link);
        },

        removeSticker(stickerUrl) {
            this.$store.commit('user/removeFavoriteStickers', stickerUrl);
        }
    },

    created() {
        this.fetchRisibank();

        // display favorite stickers by default if there's is at least one
        if (this.$store.state.user.favoriteStickers.length > 0) {
            this.risibankTab = 0;
        }
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
    min-height: 158px;
    padding: 5px;
}

.cursor-pointer {
    cursor: pointer;
}
</style>