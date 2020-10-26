<template>
    <v-row class="px-4">
        <v-col>
            <ValidationObserver ref="observer">
                <h2 class="primary--text"> Nouveau sujet </h2>

                <ValidationProvider v-slot="{ errors }" name="Titre" rules="required">
                    <v-text-field v-model="title" placeholder="Saisir le titre du sujet" :error-messages="errors" outlined dense />
                </ValidationProvider>

                <TextEditor v-model="content" />

                <v-btn color="primary" @click="createTopic()"> Poster </v-btn>
            </ValidationObserver>
        </v-col>
    </v-row>
</template>

<script>
import TextEditor from '../../TextEditor';

export default {
    name: 'CreateTopicForm',

    components: {
        TextEditor
    },

    data: () => ({
        title: '',
        content: ''
    }),

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
                const { topicId, error } = await this.repos.hidden.createTopic(forumId, this.title, this.content.trim(), this.$store.state.user.anonymousName);
                if (error) {
                    throw new Error(error);
                }
                this.$router.push(`/forums/${forumId}/hidden/${topicId}`);
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
