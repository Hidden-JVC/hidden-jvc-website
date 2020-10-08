<template>
    <v-card :class="{ 'pinned': post.Post.Pinned }" outlined>
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

            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon @click="quote(post)" class="ml-4 ml-auto" x-small v-on="on">
                        fas fa-quote-right
                    </v-icon>
                </template>
                Citer
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon v-if="showPin(post)" :color="post.Post.Pinned ? 'red' : 'green'" @click="pin(post)" class="ml-4" x-small v-on="on">
                        fas fa-thumbtack
                    </v-icon>
                </template>
                {{ post.Post.Pinned ? 'Désépingler' : 'Épingler' }}
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon v-if="showEdit(post)" @click="toggleEdit(post)" class="ml-4" x-small v-on="on">
                        fas fa-edit
                    </v-icon>
                </template>
                Modifier
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon v-if="canDelete" @click="deletePost(post)" color="red" x-small v-on="on">
                        fas fa-trash
                    </v-icon>
                </template>
                Modifier
            </v-tooltip>

        </v-card-title>

        <v-divider />

        <v-row v-if="editMode" class="px-3">
            <v-col>
                <TextEditor v-model="editContent" />

                <v-btn @click="edit()" color="primary">
                    Modifier
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="px-5" style="margin-bottom: -16px" v-show="!editMode">
            <v-col>
                <div v-html="parseJvcode(post.Post.Content)"> </div>
            </v-col>
        </v-row>

        <v-row v-if="post.Post.ModificationDate !== null" class="px-5 caption grey--text" v-show="!editMode">
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

import TextEditor from '../../TextEditor';

export default {
    name: 'HiddenPost',

    components: {
        TextEditor
    },

    props: {
        post: { required: true },
        topic: { required: true }
    },

    data() {
        return {
            editContent: this.post.Post.Content,
            editMode: false
        };
    },

    computed: {
        canDelete() {
            return this.isAdmin;
        }
    },

    methods: {
        showPin(post) {
            return !post.Post.Op && (this.isAdmin || (this.topic.Author && this.$store.state.user.userId === this.topic.Author.Id));
        },

        showEdit(post) {
            return post.User && post.User.Id === this.$store.state.user.userId;
        },

        quote(post) {
            this.$emit('quote', post);
        },

        toggleEdit() {
            this.editMode = !this.editMode;
        },

        async edit() {
            try {
                this.setLoading(true);

                const { success } = await this.repos.hidden.updatePost(this.topic.Topic.Id, this.post.Post.Id, { content: this.editContent });
                if (success) {
                    this.editMode = false;
                    this.$emit('reloadTopic');
                } else {
                    throw new Error('api error');
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

        deletePost(post) {
            console.log(post);
        },

        async pin(post) {
            try {
                this.setLoading(true);

                const { success } = await this.repos.hidden.updatePost(this.topic.Topic.Id, post.Post.Id, { pinned: !post.Post.Pinned });
                if (success) {
                    this.$emit('reloadTopic');
                } else {
                    throw new Error('api error');
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

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
.pinned {
    border-color: red;
}

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