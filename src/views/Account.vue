<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="secondary">
                        Compte
                    </v-card-title>

                    <v-card-text class="pt-5">
                        <v-text-field label="Pseudo" :value="$store.state.user.name" disabled outlined dense />

                        <v-text-field v-model="email" label="Email" hint="Attention l'adresse email est visible par tout le monde, elle sert pour la récupération du compte en cas d'oubli de mot de passe" class="mb-4" persistent-hint outlined dense />

                        <!-- <v-alert border="left" type="warning" dense>
                            Attention l'adresse email est publique
                        </v-alert> -->

                        <v-text-field v-model="profilePicture" label="Image de profil" outlined dense>
                            <template v-slot:append-outer>
                                <v-img :src="profilePicture" width="30" height="30" />
                            </template>
                        </v-text-field>

                        <v-textarea v-model="signature" label="Signature" outlined dense />

                        <v-card class="mb-4" outlined>
                            <div class="preview" v-html="preview"> </div>
                        </v-card>

                        <v-btn @click="save()" color="primary" depressed small>
                            Enregistrer
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

export default {
    name: 'Account',

    data: () => ({
        email: null,
        signature: '',
        profilePicture: ''
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

                const { user } = await this.repos.user.getUser(this.$store.state.user.name);
                this.email = user.User.Email;
                this.signature = user.User.Signature;
                this.profilePicture = user.User.ProfilePicture;
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

<style lang="scss" scoped>
.preview {
    height: 158px;
    padding: 5px;
}
</style>