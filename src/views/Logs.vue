<template>
    <v-container>
        <v-row>
            <v-col>
                <v-pagination v-model="page" :total-visible="$vuetify.breakpoint.mobile ? 5 : 9" :length="paginationLength" @input="fetchLogs()" />
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="6">
                <v-list>
                    <v-list-item v-for="log of logs" :key="log.ModerationLog.Id">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ log.ModerationLog.Label }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                par {{ log.User.Name }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Logs',

    data: () => ({
        page: 1,
        limit: 5,
        userId: null,

        logs: [],
        logsCount: 0
    }),

    computed: {
        paginationLength() {
            let length = Math.ceil(this.logsCount / this.limit);
            if (length === 0 || isNaN(length)) {
                length = 1;
            }
            return length;
        }
    },

    methods: {
        async fetchLogs() {
            try {
                this.setLoading(true);

                const { logs, count, error } = await this.repos.logs.getModerationLog(this.page, this.limit, this.userId);
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.logs = logs;
                    this.logsCount = count;
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    created() {
        this.fetchLogs();
    }
};
</script>