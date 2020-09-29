<template>
    <v-card outlined>
        <v-card-title class="py-0">
            <span class="mr-4">
                <v-img src="@/assets/larry.png" width="40" height="40" />
            </span>

            <span>
                <span :class="getUserClass(post.User)">
                    {{ getPostAuthorName(post) }}
                </span>
                <br>
                <span class="caption">
                    {{ post.Post.CreationDate | postDate() }}
                </span>
            </span>

            <v-icon class="ml-auto mr-4" x-small> fas fa-thumbtack </v-icon>
            <v-icon class="mr-4" x-small> fas fa-quote-right </v-icon>
            <v-icon class="mr-4" x-small> fas fa-edit </v-icon>
            <v-icon x-small> fas fa-trash </v-icon>
        </v-card-title>

        <v-divider />

        <v-card-text v-html="parsePostContent(post.Post.Content)" />

        <v-divider />

        <v-card-action class="pa-4">
            <span v-if="post.Post.ModificationDate !== null" class="caption">
                Message édité le {{ post.Post.ModificationDate | postDate() }}
            </span>
        </v-card-action>
    </v-card>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

export default {
    name: 'HiddenPost',

    props: {
        post: { required: true }
    },

    methods: {
        getUserClass(user) {
            if (user === null) {
                return 'anonymous-user';
            } else if (user.IsAdmin) {
                return 'admin-user';
            } else if (user.IsModerator) {
                return 'moderator-user';
            } else {
                return 'registered-user';
            }
        },

        getPostAuthorName(post) {
            if (post.User !== null) {
                return post.User.Name;
            } else {
                return post.Post.Username;
            }
        },

        parsePostContent(content) {
            return parse(content);
        }
    }
};
</script>

<style lang="scss" scoped>
.admin-user {
    color: red;
}

.moderator-user {
    color: green;
}

.registered-user {
    color: #4baeff;
}
</style>