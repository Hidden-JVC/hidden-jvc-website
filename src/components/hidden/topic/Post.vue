<template>
    <v-card outlined>
        <v-card-title class="py-0">
            <span class="mr-4">
                <v-img v-if="post.User === null || post.User.ProfilePicture === null" src="@/assets/larry.png" width="40" height="40" />
                <v-img v-if="post.User !== null && post.User.ProfilePicture !== null" :src="post.User.ProfilePicture" width="40" height="40" />
            </span>

            <span>
                <span :class="getUserClass(post.User)">
                    {{ getPostAuthorName(post) }}
                </span>
                <br>
                <span class="caption grey--text">
                    {{ post.Post.CreationDate | postDate() }}
                </span>
            </span>

            <v-icon class="ml-auto mr-4" x-small> fas fa-thumbtack </v-icon>
            <v-icon class="mr-4" x-small> fas fa-quote-right </v-icon>
            <v-icon class="mr-4" x-small> fas fa-edit </v-icon>
            <v-icon v-if="canDelete" x-small> fas fa-trash </v-icon>
        </v-card-title>

        <v-divider />

        <v-row class="px-5" style="margin-bottom: -16px">
            <v-col>
                <div v-html="parseJvcode(post.Post.Content)"> </div>
            </v-col>
        </v-row>

        <v-row v-if="post.Post.ModificationDate !== null" class="px-5 caption grey--text">
            <v-col>
                Message édité le {{ post.Post.ModificationDate | postDate() }}
            </v-col>
        </v-row>

        <v-divider v-if="post.User !== null && post.User.Signature !== null" />

        <v-row v-if="post.User !== null && post.User.Signature !== null" class="px-5 caption grey--text" style="margin-bottom: -16px">
            <v-col>
                <div v-html="parseJvcode(post.User.Signature)"> </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

export default {
    name: 'HiddenPost',

    props: {
        post: { required: true }
    },

    computed: {
        canDelete() {
            return true;
        }
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

        parseJvcode(content) {
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