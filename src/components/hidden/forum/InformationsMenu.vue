<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Informations
        </v-card-title>

        <v-card-text class="pt-4">
            <template v-if="moderators.length > 0">
                Modérateurs:

                <ul>
                    <li v-for="moderator of moderators" :key="moderator.Id" v-text="moderator.Name">
                        {{ moderator.Name }}
                    </li>
                </ul>
            </template>
            <template v-else>
                Aucun modérateurs
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'InformationsMenu',

    props: {
        moderators: {
            required: true,
            type: Array
        }
    }
};
</script>