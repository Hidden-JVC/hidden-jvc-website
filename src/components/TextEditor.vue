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

                    <v-divider />

                    <v-row class="mx-0 stickers-container">
                        <v-col v-for="sticker of stickers" :key="sticker.id" cols="3" lg="2" class="text-center">
                            <v-hover v-slot:default="{ hover }">
                                <div>
                                    <v-img v-if="risibankTab === 0" :src="sticker" width="70" height="55" @click.passive="addSticker(sticker)">
                                        <v-row v-show="hover" align="end" class="fill-height">
                                            <v-col class="pb-0 mr-1 text-right">
                                                <v-icon @click.stop="removeSticker(sticker)" color="red" small> fas fa-trash </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-img>

                                    <v-img v-if="risibankTab !== 0" :src="sticker.risibank_link" width="70" height="55" @click.passive="addSticker(sticker.risibank_link)">
                                        <v-row v-show="hover" align="end" class="fill-height">
                                            <v-col class="pb-0 mr-1 text-right">
                                                <v-icon @click.stop="saveSticker(sticker)" color="yellow" small> fas fa-star </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-img>
                                </div>
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
            risibankTab: 1,
            risibank: null,
            showRisibank: true
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

.cursor-pointer {
    cursor: pointer;
}
</style>