<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Informations
        </v-card-title>

        <template v-if="moderators.length > 0">
            <v-list class="py-0" dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                            Modérateurs:

                            <span v-for="(moderator, i) of moderators" :key="moderator.Id">
                                <router-link :to="`/users/${moderator.Name}`" class="no-text-decoration grey--text">
                                    {{ moderator.Name }}
                                </router-link>
                                <span v-if="i !== moderators.length - 1">, </span>
                            </span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                            Logs
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            <ul style="max-height: 65px; overflow-y: auto" ref="logs">
                                <li v-for="(log, i) of $store.state.application.logs.slice().reverse()" :key="log" :class="{ 'blue--text': i === 0 }">
                                    {{ log }}
                                </li>
                            </ul>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
        <template v-else>
            Aucun modérateur
        </template>
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