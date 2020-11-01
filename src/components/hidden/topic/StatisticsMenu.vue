<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Statistiques

            <span class="ml-auto">
                <v-icon x-small> fa fa-users </v-icon>
                {{ topicCount }} connecté(s)
            </span>
        </v-card-title>

        <v-card-text class="pa-0" style="background-color: #444a4d;">
            <v-list>
                <v-list-item>
                    <v-list-item-content>

                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'StatisticsMenu',

    props: {
        forumId: { required: true, type: Number },
        topicId: { required: true, type: Number }
    },

    data: () => ({
        topicCount: 0
    }),

    methods: {
        async fetchUsersCount() {
            const { topicCount } = await this.getConnectedUsersCount(this.forumId, this.topicId);
            this.topicCount = topicCount;
        }
    },

    created() {
        this.fetchUsersCount();
    }
};
</script>