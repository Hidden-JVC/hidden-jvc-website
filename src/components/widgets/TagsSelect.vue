<template>
    <v-select v-model="selectedTags" :items="tags" @change="$emit('input', selectedTags)" item-value="Id" item-text="Name" :placeholder="placeholder" hide-details :menu-props="{ offsetY: true }" multiple outlined dense>
        <template v-slot:selection="{ item }">
            <v-chip class="ml-2" :color="item.Color" label small>
                {{ item.Name }} <v-icon v-if="item.Locked" x-small right> fas fa-lock </v-icon>
            </v-chip>
        </template>
        <template v-slot:item="{ item }">
            <v-list-item-content>
                <v-list-item-title>
                    <v-chip class="ml-2" :color="item.Color" label small>
                        {{ item.Name }} <v-icon v-if="item.Locked" x-small right> fas fa-lock </v-icon>
                    </v-chip>
                </v-list-item-title>
            </v-list-item-content>
        </template>
    </v-select>
</template>

<script>
export default {
    name: 'TagsSelect',

    props: {
        tags: { type: Array, required: true },
        value: { type: Array, required: true },
        placeholder: { type: String }
    },

    data: () => ({
        selectedTags: []
    }),

    created() {
        this.selectedTags = this.value;
    }
};
</script>