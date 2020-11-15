<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Recherche
        </v-card-title>

        <v-card-text class="pt-4">
            <ValidationObserver ref="observer">
                <ValidationProvider v-slot="{ errors, failed }" name="Recherche" rules="required|min:3">
                    <v-text-field v-model="search" outlined dense :hide-details="!failed" label="Rechercher dans le forum" :error-messages="errors" />
                </ValidationProvider>

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

    data: () => ({
        search: '',
        type: '',

        types: [{ text: 'Sujet', value: 'Title' }, { text: 'Auteur', value: 'Author' }]
    }),

    methods: {
        async submit() {
            const valid = await this.$refs.observer.validate();
            if (!valid) {
                return;
            }

            this.$emit('search', this.search, this.type);
        }
    }
};
</script>