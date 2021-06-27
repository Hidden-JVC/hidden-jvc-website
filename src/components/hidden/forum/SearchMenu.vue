<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Recherche
        </v-card-title>

        <v-card-text class="pt-4">
            <ValidationObserver ref="observer">
                <ValidationProvider v-slot="{ errors, failed }" name="Titre" rules="min:3">
                    <v-text-field @keyup.enter="submit()" v-model="title" outlined dense :hide-details="!failed" placeholder="Titre" :error-messages="errors" class="mb-2" />
                </ValidationProvider>

                <UsersSelect v-model="userId" placeholder="Auteur" class="mb-2" />

                <TagsSelect v-model="tags" :tags="availableTags" placeholder="Tags" class="mb-2" />

                <v-btn @click="submit()" color="secondary" depressed block small>
                    Rechercher
                </v-btn>
            </ValidationObserver>
        </v-card-text>
    </v-card>
</template>

<script>
import TagsSelect from '../../widgets/TagsSelect';
import UsersSelect from '../../widgets/UsersSelect';

export default {
    name: 'SearchMenu',

    components: {
        TagsSelect,
        UsersSelect
    },

    props: {
        availableTags: { type: Array, default: () => [] },
        defaultTitle: { type: String, default: null },
        defaultTags: { type: Array, default: () => [] },
        defaultUserId: { type: String, default: null }
    },

    data: function () {
        return {
            title: this.defaultTitle,
            tags: this.defaultTags,
            userId: this.defaultUserId
        };
    },

    methods: {
        async submit() {
            const valid = await this.$refs.observer.validate();
            if (!valid) {
                return;
            }

            this.$emit('search', this.title, this.userId, this.tags);
        },

        setTitle(title) {
            this.title = title;
        }
    }
};
</script>