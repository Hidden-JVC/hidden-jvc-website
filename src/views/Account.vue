<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="secondary">
                        Compte
                    </v-card-title>

                    <v-card-text class="pt-5">
                        <ValidationObserver ref="observer">
                            <v-text-field label="Pseudo" :value="$store.state.user.name" disabled outlined dense />

                            <v-text-field v-model.trim="email" label="Email" hint="Attention l'adresse email est visible par tout le monde, elle sert pour la récupération du compte en cas d'oubli de mot de passe" class="mb-4" persistent-hint outlined dense />

                            <ValidationProvider v-slot="{ errors }" name="Image de profil" rules="noelshackurl">
                                <v-text-field v-model.trim="profilePicture" label="Image de profil" placeholder="https://www.noelshack.com/" outlined dense :error-messages="errors">
                                    <template v-slot:append-outer>
                                        <v-img :src="profilePicture" width="30" height="30" />
                                    </template>
                                </v-text-field>
                            </ValidationProvider>

                            <TextEditor v-model="signature" :required="false" />

                            <v-btn @click="save()" color="primary" depressed small>
                                Enregistrer
                            </v-btn>
                        </ValidationObserver>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { parse } from 'hidden-jvc-jvcode';

import TextEditor from '../components/TextEditor';

export default {
    name: 'Account',

    components: {
        TextEditor
    },

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

                const { user, error } = await this.repos.user.getUser(this.$store.state.user.name);
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.email = user.User.Email;
                    this.signature = user.User.Signature || '';
                    this.profilePicture = user.User.ProfilePicture;
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

                const valid = await this.$refs.observer.validate();
                if (!valid) {
                    return;
                }

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
                this.openErrorDialog('Une erreur est survenue lors de la récupération des topics');
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