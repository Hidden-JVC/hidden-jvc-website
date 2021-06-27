<template>
    <v-card :class="{ 'owned': $store.state.settings.highlightUserMessages && isPostMadeByConnectedUser }" outlined>
        <v-card-title class="py-0">
            <span class="mr-4">
                <router-link :to="`/users/${post.User.Name}`">
                    <v-menu offset-y offset-x top open-on-hover nudge-width="400">
                        <template v-slot:activator="{ on }">
                            <v-avatar v-on="on">
                                <v-img v-if="post.User.ProfilePicture === null" src="@/assets/larry.png" />
                                <v-img v-if="post.User.ProfilePicture !== null" :src="post.User.ProfilePicture" />
                            </v-avatar>
                        </template>
                        <AccountMenu :user="post.User" />
                    </v-menu>
                </router-link>
            </span>

            <span>
                <router-link :to="`/users/${post.User.Name}`" class="no-text-decoration">
                    <v-menu offset-y offset-x top open-on-hover nudge-width="400">
                        <template v-slot:activator="{ on }">
                            <span v-on="on" :class="getUserClass(post.User)">
                                {{ post.User.Name }}
                            </span>
                        </template>
                        <AccountMenu :user="post.User" />
                    </v-menu>
                </router-link>

                <br>

                <span class="caption grey--text">
                    {{ post.CreationDate | postDate() }}
                </span>
            </span>

            <QuoteHistory v-if="post.QuotedPostId" :postId="originalPostId">
                <template v-slot:activator="{ on: quotedPost }">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-btn class="ml-auto" icon v-on="{ ...tooltip, ...quotedPost }">
                                <v-icon small> fas fa-list </v-icon>
                            </v-btn>
                        </template>
                        Afficher toutes les citations
                    </v-tooltip>
                </template>
            </QuoteHistory>
        </v-card-title>

        <v-divider />

        <v-row class="px-5" style="margin-bottom: -16px">
            <v-col>
                <div ref="postContent" v-html="parseJvcode(post.Content)"> </div>
            </v-col>
        </v-row>

        <v-row v-if="post.ModificationDate !== null" class="px-5 caption grey--text">
            <v-col>
                Message édité le {{ post.ModificationDate | postDate() }}
            </v-col>
        </v-row>
    </v-card>
</template>

<script>

import AccountMenu from './AccountMenu';
import QuoteHistory from './QuoteHistory';

import initBlockquote from '../../../helpers/initBlockquote';
import initEmbedMedia from '../../../helpers/initEmbedMedia';
import initCode from '../../../helpers/initCode';

export default {
    name: 'QuotedPost',

    components: {
        AccountMenu,
        QuoteHistory
    },

    props: {
        post: { required: true },
        originalPostId: { require: true }
    },

    computed: {
        isPostMadeByConnectedUser() {
            return this.post.User !== null && this.$store.state.user.user !== null && this.post.User.Id === this.$store.state.user.user.Id;
        }
    },

    created() {
        this.$nextTick(() => {
            initBlockquote(this.$refs.postContent);
            initEmbedMedia(this.$refs.postContent);
            initCode(this.$refs.postContent);
        });
    }
};
</script>

<style lang="scss" scoped>
.owned {
    border-color: #2196f3;
}
</style>