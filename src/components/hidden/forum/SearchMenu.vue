<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Recherche
        </v-card-title>

        <v-card-text class="pt-4">
            <ValidationObserver ref="observer">
                <ValidationProvider v-slot="{ errors, failed }" name="Recherche" rules="min:3">
                    <v-text-field v-show="type !== 'Tags'" v-model="search" outlined dense :hide-details="!failed" label="Rechercher dans le forum" :error-messages="errors" />
                </ValidationProvider>

                <v-select v-show="type === 'Tags'" v-model="selectedTags" :items="tags" item-value="Id" item-text="Name" label="Tags" hide-details :menu-props="{ offsetY: true }" multiple outlined dense />

                <ValidationProvider v-slot="{ errors, failed }" name="Type" rules="required">
                    <v-select v-model="type" :items="types" :menu-props="{ offsetY: true }" outlined dense :hide-details="!failed" class="mt-2" label="Type de la recherche" :error-messages="errors" />
                </ValidationProvider>

                <v-btn @click="submit()" class="mt-4" color="secondary" depressed block small>
                    Rechercher
                </v-btn>
            </ValidationObserver>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'SearchMenu',

    props: {
        tags: { type: Array, default: () => [] }
    },

    data: () => ({
        search: '',
        selectedTags: [],
        type: 'Title',

        types: [{ text: 'Sujet', value: 'Title' }, { text: 'Auteur', value: 'Author' }, { text: 'Tags', value: 'Tags' }]
    }),

    methods: {
        async submit() {
            const valid = await this.$refs.observer.validate();
            if (!valid) {
                return;
            }

            let search = this.search;
            if (this.type === 'Tags') {
                search = this.selectedTags.join(',');
            }

            this.$emit('search', search, this.type);
        }
    }
};
</script>