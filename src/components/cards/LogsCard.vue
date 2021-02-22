<template>
    <v-card :loading="loading" outlined>
        <v-overlay :value="loading" absolute />

        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Logs de moderation

            <div v-if="logs.length > 0" class="ml-auto">
                <v-btn icon @click="page-- && fetchLogs()" :disabled="page === 1">
                    <v-icon small>
                        fas fa-chevron-left
                    </v-icon>
                </v-btn>

                <v-btn icon @click="page++ && fetchLogs()" :disabled="page === paginationLength">
                    <v-icon small>
                        fas fa-chevron-right
                    </v-icon>
                </v-btn>
            </div>
        </v-card-title>

        <v-list style="max-height: 200px; overflow-y: auto" dense>
            <v-list-item v-for="log of logs" :key="log.ModerationLog.Id">
                <v-list-item-content>
                    <v-list-item-title> {{ log.ModerationLog.Label }} </v-list-item-title>
                    <v-list-item-subtitle> {{ log.User.Name }} </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="logs.length === 0">
                <v-list-item-content>
                    <v-list-item-title> Aucune action </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'LogsCard',

    props: {
        forumId: { required: true, type: Number },
        jvcTopicId: { type: Number },
        hiddenTopicId: { type: Number }
    },

    data: () => ({
        page: 1,
        limit: 3,

        loading: true,

        logs: [],
        count: 0
    }),

    computed: {
        paginationLength() {
            let length = Math.ceil(this.count / this.limit);
            if (length === 0 || isNaN(length)) {
                length = 1;
            }
            return length;
        }
    },

    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },

        async fetchLogs() {
            try {
                this.loading = true;

                await this.sleep(1000);

                const query = {
                    page: this.page,
                    limit: this.limit
                };

                query.forumId = this.forumId;
                if (this.jvcTopicId) {
                    query.jvcTopicId = this.jvcTopicId;
                }
                if (this.hiddenTopicId) {
                    query.hiddenTopicId = this.hiddenTopicId;
                }
                const { logs, count, error } = await this.repos.logs.getModerationLog(query);

                if (error) {
                    this.$store.commit('application/pushLog', 'Une erreur est survenue lors de la recuperation des logs de moderation: ' + error);
                } else {
                    this.logs = logs;
                    this.count = count;
                }
            } catch (err) {
                console.error(err);
                this.$store.commit('application/pushLog', 'Une erreur est survenue lors de la recuperation des logs de moderation');
            } finally {
                this.loading = false;
            }
        }
    },

    created() {
        this.fetchLogs();
    }
};
</script>