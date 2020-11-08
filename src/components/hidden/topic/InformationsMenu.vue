<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Informations

            <span class="ml-auto">
                <v-icon x-small> fa fa-users </v-icon>
                {{ topicCount }} connecté(s)
            </span>
        </v-card-title>

        <v-card-text class="pt-4">
            Modérateurs:

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
    name: 'InformationsMenu',

    props: {
        forumId: { required: true, type: Number },
        topicId: { required: true, type: Number },
        moderators: {
            required: true,
            type: Array
        }
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