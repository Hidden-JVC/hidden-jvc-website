<template>
    <v-card :class="{ 'pinned': post.Post.Pinned, 'owned': isPostMadeByConnectedUser }" outlined>
        <v-card-title class="py-0">
            <span class="mr-4">
                <v-img v-if="post.User === null || post.User.ProfilePicture === null" src="@/assets/larry.png" width="40" height="40" />
                <v-img v-if="post.User !== null && post.User.ProfilePicture !== null" :src="post.User.ProfilePicture" width="40" height="40" />
            </span>

            <span>
                <router-link v-if="post.User !== null" :to="`/users/${post.User.Name}`" class="no-text-decoration" :class="getUserClass(post.User)">
                    {{ getPostAuthorName() }}
                </router-link>
                <span v-else :class="getUserClass(post.User)">
                    {{ getPostAuthorName() }}
                </span>
                <br>
                <span class="caption grey--text">
                    {{ post.Post.CreationDate | postDate() }}
                </span>
            </span>

            <!-- Edit -->
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon v-if="showEdit" @click="toggleEdit()" class="ml-auto" color="blue" x-small v-on="on">
                        fas fa-edit
                    </v-icon>
                </template>
                Modifier
            </v-tooltip>

            <!-- Quote -->
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon @click="quote(post)" :class="showEdit ? 'ml-4' : 'ml-auto'" x-small v-on="on">
                        fas fa-quote-right
                    </v-icon>
                </template>
                Citer
            </v-tooltip>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-icon class="ml-4" small v-on="on">
                        fas fa-ellipsis-h
                    </v-icon>
                </template>

                <v-list dense>
                    <v-list-item v-if="post.User !== null" @click="$emit('fic-mode', post.User.Id)">
                        <v-list-item-title> Afficher les posts de cet utilisateur </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showEdit" @click="toggleEdit()">
                        <v-list-item-title> Modifier </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showPin" @click="pin()">
                        <v-list-item-title> {{ post.Post.Pinned ? 'Désépingler' : 'Épingler' }} </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showDelete" @click="deletePost()">
                        <v-list-item-title> Supprimer </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showBanAccount" @click="banAccount(true)">
                        <v-list-item-title> Ban le compte </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showUnbanAccount" @click="banAccount(false)">
                        <v-list-item-title> Déban le compte </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showBanIp" @click="banIp(true)">
                        <v-list-item-title> Ban l'ip </v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="showUnbanIp" @click="banIp(false)">
                        <v-list-item-title> Déban l'ip </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>

        <v-divider />

        <v-row v-if="editMode" class="px-3">
            <v-col>
                <TextEditor v-model="editContent" />

                <v-btn @click="edit()" color="primary" depressed small>
                    Modifier
                </v-btn>

                <v-btn @click="editMode = false" color="secondary" class="float-right" depressed small>
                    Annuler
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
        topic: { required: true },
        forum: { required: true }
    },

    data() {
        return {
            editContent: this.post.Post.Content,
            editMode: false
        };
    },

    computed: {
        isPostMadeByConnectedUser() {
            return this.post.User !== null && this.post.User.Id === this.$store.state.user.userId;
        },

        showBanAccount() {
            return this.post.User !== null && !this.post.User.Banned && (
                this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'BanAccount')
            );
        },

        showUnbanAccount() {
            return this.post.User !== null && this.post.User.Banned && (
                this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'BanAccount')
            );
        },

        showBanIp() {
            return !this.post.Post.IpBanned && (
                this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'BanIp')
            );
        },

        showUnbanIp() {
            return this.post.Post.IpBanned && (
                this.isAdmin || this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'BanIp')
            );
        },

        showPin() {
            return !this.post.Post.Op // can't pin first post
                && (this.topic.Author && this.topic.Author.Id === this.$store.state.user.userId); // author can pin posts
        },

        showEdit() {
            return this.isPostMadeByConnectedUser;
        },

        showDelete() {
            return this.isAdmin
                || this.$store.getters['user/hasRightOnForum'](this.forum.Forum.Id, 'Delete')
                || this.isPostMadeByConnectedUser;
        }
    },

    methods: {
        quote() {
            this.$emit('quote', this.post);
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

        async deletePost() {
            try {
                this.setLoading(true);

                const { success } = await this.repos.hidden.postsModeration('Delete', [this.post.Post.Id]);
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

        async pin() {
            try {
                this.setLoading(true);

                const { success } = await this.repos.hidden.updatePost(this.topic.Topic.Id, this.post.Post.Id, { pinned: !this.post.Post.Pinned });
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

        async banAccount(ban) {
            try {
                this.setLoading(true);

                const { success } = await this.repos.hidden.postsModeration(ban ? 'BanAccount' : 'UnBanAccount', [this.post.Post.Id]);
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

        async banIp(ban) {
            try {
                this.setLoading(true);

                const { success } = await this.repos.hidden.postsModeration(ban ? 'BanIp' : 'UnBanIp', [this.post.Post.Id]);
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

        getPostAuthorName() {
            if (this.post.User !== null) {
                return this.post.User.Name;
            } else {
                return this.post.Post.Username;
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
    border-color: #060;
}

.owned {
    border-color: #2196f3;
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