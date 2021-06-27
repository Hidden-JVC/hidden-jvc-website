<template>
    <v-menu offset-y left>
        <template v-slot:activator="{ on }">
            <v-btn class="text-none" text v-on="on">
                <v-icon left> fas fa-user-circle </v-icon>
                {{ $store.state.user.user.Name }}
                <v-icon right> fas fa-caret-down </v-icon>
            </v-btn>
        </template>

        <v-list class="py-0">
            <v-list-item class="py-3">
                <v-list-item-avatar>
                    <v-avatar>
                        <v-img v-if="$store.state.user.user.ProfilePicture === null" src="@/assets/larry.png" />
                        <v-img v-if="$store.state.user.user.ProfilePicture !== null" :src="$store.state.user.user.ProfilePicture" />
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="title"> {{ $store.state.user.user.Name }} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list-item class="py-2" to="/account">
                <v-list-item-action>
                    <v-icon color="blue" small> fas fa-user </v-icon>
                </v-list-item-action>

                <v-list-item-title> Profile </v-list-item-title>
            </v-list-item>

            <v-list-item class="py-2" @click="disconnect()">
                <v-list-item-action>
                    <v-icon color="red" small> fas fa-sign-out-alt </v-icon>
                </v-list-item-action>

                <v-list-item-title> Déconnexion </v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item dense>
                <v-list-item-action>
                    <v-icon small> fas fa-code-branch </v-icon>
                </v-list-item-action>

                <v-list-item-title> v1.0.0 </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'UserProfile',

    methods: {
        async disconnect() {
            this.$store.commit('user/disconnect');
        }
    },

    computed: {
        nameFirstLetter() {
            return this.$store.state.user.user.Name[0];
        }
    }
};
</script>