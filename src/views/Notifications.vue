<template>
    <v-row justify="center">
        <v-col v-if="$store.state.user.user !== null" cols="11" xl="7">

            <h1 class="text-center"> Notifications </h1>

            <v-row v-for="notification of $store.state.user.notifications" :key="notification.Id">
                <v-col>
                    <v-card>
                        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
                            <span class="grey--text mr-1"> Topic </span>
                            <router-link :to="getTopicUrl(notification)" class="no-text-decoration">
                                <span class="mr-1 white--text"> {{ notification.Title }} </span>
                            </router-link>
                            <span class="grey--text mr-1"> de </span>
                            <router-link :to="`/users/${notification.User.Name}`" class="no-text-decoration white--text">
                                {{ notification.User.Name }}
                            </router-link>

                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn class="ml-auto" small icon v-on="on" @click="deleteNotifications(notification.Posts.map((p) => p.Id))">
                                        <v-icon small> fas fa-times </v-icon>
                                    </v-btn>
                                </template>
                                Supprimer toutes les notifications de ce topic
                            </v-tooltip>
                        </v-card-title>

                        <v-card-text class="pt-4">
                            <Post v-for="(post, i) of notification.Posts" :key="post.Id" :notificationMode="true" :post="post" :class="{ 'mb-4': i !== notification.Posts.length - 1 }" @delete-notification="deleteNotifications([post.Id])" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import textToUrl from '../helpers/textToUrl';
import Post from '../components/hidden/topic/Post';

export default {
    name: 'Notifications',

    components: {
        Post
    },

    methods: {
        getTopicUrl(topic) {
            const title = textToUrl(topic.Title);
            return `/forums/${topic.JVCForumId}/hidden/${topic.Id}-` + title;
        },

        async deleteNotifications(postIds) {
            try {
                const start = performance.now();
                this.setLoading(true);

                const notifications = [];
                for (const hiddenPostId of postIds) {
                    notifications.push({ userId: this.$store.state.user.user.Id, hiddenPostId });
                }

                const { error } = await this.repos.notifications.deleteNotifications(notifications);
                if (error) {
                    return this.openErrorDialog(error);
                } else {
                    this.repos.user.me().then((response) => {
                        if (response.error) {
                            this.$store.commit('user/disconnect');
                        } else {
                            this.$store.commit('user/setUser', response.user);
                            this.$store.commit('user/setNotifications', response.notifications);

                            const end = performance.now();
                            this.$store.commit('application/pushLog', `Notification(s) supprimée(s) en ${(end - start) / 1000}s`);
                        }
                    }).catch(console.error);
                }
            } catch (err) {
                this.openErrorDialog('Une erreur est survenue lors de la suppression des notifications');
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    }
};
</script>
