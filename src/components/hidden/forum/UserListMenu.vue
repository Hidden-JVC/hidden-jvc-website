<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Utilisateurs

            <span class="ml-auto">
                <v-icon x-small> fa fa-users </v-icon>
                {{ forumCount }} connecté(s)
            </span>
        </v-card-title>

        <v-list style="max-height: 200px; overflow-y: auto">
            <v-list-item v-for="user of forumUsers" :key="user.userId" :to="`/users/${user.userName}`">
                <v-list-item-avatar>
                    <v-img :src="user.profilePicture" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title> {{ user.userName }} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="anonymousUserCount > 0">
                <v-list-item-avatar>
                    <v-img src="@/assets/larry.png" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="light-grey--text"> {{ anonymousUserCount }} utilisateur(s) anonymes </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'UserListMenu',

    props: {
        forumId: { required: true, type: Number }
    },

    data: () => ({
        forumCount: 0,
        forumUsers: [],
        anonymousUserCount: 0
    }),

    methods: {
        async fetchUsersCount() {
            const { forumCount, forumUsers } = await this.getConnectedUsersCount(this.forumId);
            this.forumCount = forumCount;
            for (const user of forumUsers) {
                if (Object.keys(user).length > 0) {
                    this.forumUsers.push(user);
                } else {
                    this.anonymousUserCount++;
                }
            }
        }
    },

    created() {
        this.fetchUsersCount();
    }
};
</script>