<template>
    <v-menu offset-y left>
        <template v-slot:activator="{ on }">
            <v-btn class="text-none" text v-on="on">
                <v-icon left> fas fa-user-circle </v-icon>
                    {{ $store.state.user.name }}
                <v-icon right> fas fa-caret-down </v-icon>
            </v-btn>
        </template>

        <v-list class="py-0">
            <v-list-item class="py-3">
                <v-list-item-avatar>
                    <v-avatar color="blue">
                        <span class="white--text headline text-uppercase"> {{ nameFirstLetter }} </span>
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="title"> {{ $store.state.user.name }} </v-list-item-title>
                    <v-list-item-subtitle> msetair.dedeset@gmail.com </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider />

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

                <v-list-item-title> v0.1.0 </v-list-item-title>
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
            return this.$store.state.user.name[0];
        }
    }
};
</script>