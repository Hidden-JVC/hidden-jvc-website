<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Moderateurs
        </v-card-title>

        <v-card-text class="pt-4">
            <ul>
                <li v-for="moderator of moderators" :key="moderator.Id" v-text="moderator.Name">
                    {{ moderator.Name }}
                </li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'ModeratorsMenu',

    props: {
        moderators: {
            required: true,
            type: Array
        }
    }
};
</script>