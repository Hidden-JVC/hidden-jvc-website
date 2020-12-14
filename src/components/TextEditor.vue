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
                    <v-btn small target="_blank" href="https://marked.js.org/demo/?text=Marked%20-%20Markdown%20Parser%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%0A%5BMarked%5D%20lets%20you%20convert%20%5BMarkdown%5D%20into%20HTML.%20%20Markdown%20is%20a%20simple%20text%20format%20whose%20goal%20is%20to%20be%20very%20easy%20to%20read%20and%20write%2C%20even%20when%20not%20converted%20to%20HTML.%20%20This%20demo%20page%20will%20let%20you%20type%20anything%20you%20like%20and%20see%20how%20it%20gets%20converted.%20%20Live.%20%20No%20more%20waiting%20around.%0A%0AHow%20To%20Use%20The%20Demo%0A-------------------%0A%0A1.%20Type%20in%20stuff%20on%20the%20left.%0A2.%20See%20the%20live%20updates%20on%20the%20right.%0A%0AThat%27s%20it.%20%20Pretty%20simple.%20%20There%27s%20also%20a%20drop-down%20option%20in%20the%20upper%20right%20to%20switch%20between%20various%20views%3A%0A%0A-%20**Preview%3A**%20%20A%20live%20display%20of%20the%20generated%20HTML%20as%20it%20would%20render%20in%20a%20browser.%0A-%20**HTML%20Source%3A**%20%20The%20generated%20HTML%20before%20your%20browser%20makes%20it%20pretty.%0A-%20**Lexer%20Data%3A**%20%20What%20%5Bmarked%5D%20uses%20internally%2C%20in%20case%20you%20like%20gory%20stuff%20like%20this.%0A-%20**Quick%20Reference%3A**%20%20A%20brief%20run-down%20of%20how%20to%20format%20things%20using%20markdown.%0A%0AWhy%20Markdown%3F%0A-------------%0A%0AIt%27s%20easy.%20%20It%27s%20not%20overly%20bloated%2C%20unlike%20HTML.%20%20Also%2C%20as%20the%20creator%20of%20%5Bmarkdown%5D%20says%2C%0A%0A%3E%20The%20overriding%20design%20goal%20for%20Markdown%27s%0A%3E%20formatting%20syntax%20is%20to%20make%20it%20as%20readable%0A%3E%20as%20possible.%20The%20idea%20is%20that%20a%0A%3E%20Markdown-formatted%20document%20should%20be%0A%3E%20publishable%20as-is%2C%20as%20plain%20text%2C%20without%0A%3E%20looking%20like%20it%27s%20been%20marked%20up%20with%20tags%0A%3E%20or%20formatting%20instructions.%0A%0AReady%20to%20start%20writing%3F%20%20Either%20start%20changing%20stuff%20on%20the%20left%20or%0A%5Bclear%20everything%5D(%2Fdemo%2F%3Ftext%3D)%20with%20a%20simple%20click.%0A%0A%5BMarked%5D%3A%20https%3A%2F%2Fgithub.com%2Fmarkedjs%2Fmarked%2F%0A%5BMarkdown%5D%3A%20http%3A%2F%2Fdaringfireball.net%2Fprojects%2Fmarkdown%2F%0A&options=&version=master">
                        <v-icon small> fas fa-question-circle </v-icon>
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