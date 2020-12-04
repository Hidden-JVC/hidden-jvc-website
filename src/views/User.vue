<template>
    <v-container v-if="user !== null">
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="secondary">
                        <span class="mx-auto">
                            {{ user.User.Name }}
                        </span>
                    </v-card-title>

                    <v-card-text class="pt-5">
                        <v-row justify="center">
                            <v-col cols="6">
                                <v-img :src="user.User.ProfilePicture" />
                            </v-col>

                            <v-col cols="6">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span class="text-bold">
                                                        Membres depuis :
                                                    </span>
                                                </td>
                                                <td>
                                                    {{ user.User.CreationDate | toDateStr() }}
                                                    ({{ user.User.CreationDate | daysSinceDate() }} jours)
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>

                        <h3> Badges </h3>

                        <v-list>
                            <v-list-item v-for="badge of user.Badges" :key="badge.Id">
                                <v-list-item-icon>
                                    <v-img src="@/assets/badges/BetaTester.png" width="60" height="60" />
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ badge.Name }}
                                        ( {{ badge.AssociationDate | toDateStr() }} )
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

export default {
    name: 'User',

    data: () => ({
        user: null
    }),

    computed: {
        preview() {
            return parse(this.signature || '');
        }
    },

    methods: {
        async fetchUser() {
            try {
                this.setLoading(true);

                const { user } = await this.repos.user.getUser(this.$route.params.userName);
                this.user = user;
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        },

        async save() {
            try {
                this.setLoading(true);

                const body = {
                    email: this.email,
                    signature: this.signature,
                    profilePicture: this.profilePicture
                };

                const { success } = await this.repos.user.updateUser(this.$store.state.user.userId, body);
                if (success) {
                    await this.fetchUser();
                } else {
                    throw new Error('api error');
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.setLoading(false);
            }
        }
    },

    created() {
        this.fetchUser();
    }
};
</script>
