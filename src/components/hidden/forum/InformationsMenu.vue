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
                            Modérateurs
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            <ul>
                                <li v-for="moderator of moderators" :key="moderator.Id">
                                    <router-link :to="`/users/${moderator.Name}`">
                                        {{ moderator.Name }}
                                    </router-link>
                                </li>
                            </ul>
                        </v-list-item-subtitle>
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