<template>
    <div v-if="user !== null">
        <v-row justify="center" no-gutters>
            <v-col cols="12" xl="9">
                <v-card>
                    <!-- <v-sheet color="#37383a" class="pa-4">
                        <v-avatar :size="110" class="">
                            <v-img v-if="user.ProfilePicture !== null" :src="user.ProfilePicture" />
                            <v-img v-else src="@/assets/larry.png" />
                        </v-avatar>

                        <div class=" ml-4">
                            <h1 class="mb-4">
                                {{ user.Name }}
                            </h1>

                            <v-tooltip top v-for="badge of user.Badges" :key="badge.Id">
                                <template v-slot:activator="{ on }">
                                    <v-chip label small class="mr-2" v-on="on"> {{ badge.Name }} </v-chip>
                                </template>
                                {{ badge.Description }}
                            </v-tooltip>
                        </div>
                    </v-sheet>

                    <v-row style="margin-left: 130px">
                        <v-col class="py-0">
                            <small> Membres depuis : </small> <br>
                            <span class="white--text">
                                {{ user.CreationDate | toDateStr() }}
                                ({{ user.CreationDate | daysSinceDate() }} jours)
                            </span>
                        </v-col>

                        <v-col class="py-0">
                            <small> Messages </small> <br>
                            <span class="white--text"> {{ user.PostCount }} </span>
                        </v-col>

                        <v-col class="py-0">
                            <small> Dernière connexion </small> <br>
                            <span class="white--text"> 12/01/2021 </span>
                        </v-col>
                    </v-row> -->

                    <v-sheet color="#37383a" class="pa-4">
                        <v-row>
                            <v-col cols="2">
                                <v-avatar :size="180" style="position: absolute">
                                    <v-img v-if="user.ProfilePicture !== null" :src="user.ProfilePicture" />
                                    <v-img v-else src="@/assets/larry.png" />
                                </v-avatar>
                            </v-col>

                            <v-col>
                                <h1 class="mb-4">
                                    {{ user.Name }}
                                </h1>

                                <v-tooltip top v-for="badge of user.Badges" :key="badge.Id">
                                    <template v-slot:activator="{ on }">
                                        <v-chip label small class="mr-2" v-on="on"> {{ badge.Name }} </v-chip>
                                    </template>
                                    {{ badge.Description }}
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-sheet>

                    <v-row class="mt-4 pa-4">
                        <v-col class="py-0" offset="2">
                            <small> Membres depuis </small> <br>
                            <span class="white--text">
                                {{ user.CreationDate | toDateStr() }}
                                ({{ user.CreationDate | daysSinceDate() }} jours)
                            </span>
                        </v-col>

                        <v-col class="py-0">
                            <small> Messages </small> <br>
                            <span class="white--text"> {{ user.PostCount }} </span>
                        </v-col>

                        <v-col class="py-0">
                            <small> Dernière connexion </small> <br>
                            <span class="white--text"> 12/01/2021 </span>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" xl="9">
                <v-tabs fixed-tabs>
                    <v-tab>
                        Topics
                    </v-tab>
                    <v-tab>
                        Messages
                    </v-tab>
                    <v-tab>
                        DDB
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </div>
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

                const { user, error } = await this.repos.user.getUser(this.$route.params.userName);
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.user = user;
                }
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

                const { error } = await this.repos.user.updateUser(this.$store.state.user.userId, body);
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    await this.fetchUser();
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
