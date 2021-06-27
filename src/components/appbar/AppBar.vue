<template>
    <v-app-bar app dense clipped-left>
        <!-- <v-img src="@/assets/larry.png" max-width="48" max-height="48" class="mr-4" contain /> -->

        <v-toolbar-title>
            Hidden JVC
        </v-toolbar-title>

        <v-toolbar-items class="hidden-sm-and-down ml-4">
            <v-btn class="text-capitalize" to="/forums/51/hidden" text dark>
                <v-icon left> fas fa-comments </v-icon> Forums
            </v-btn>

            <v-btn class="text-capitalize" to="/favorites" text dark>
                <v-icon left> fas fa-star </v-icon> Favoris
            </v-btn>

            <v-btn class="text-capitalize" to="/messagerie" text dark>
                <v-icon left> fas fa-envelope </v-icon> Messagerie
            </v-btn>

            <v-btn class="text-capitalize" to="/stats" text dark>
                <v-icon left> fas fa-chart-area </v-icon> Stats
            </v-btn>

            <v-btn class="text-capitalize" to="/parametres" text dark>
                <v-icon left> fas fa-cogs </v-icon> Paramètres
            </v-btn>
        </v-toolbar-items>

        <v-spacer />

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-badge overlap dot left :value="$store.state.user.notifications.length">
                    <v-btn class="mr-4" small icon to="/notifications" v-on="on" v-show="$store.state.user.user !== null">
                        <v-icon small> fas fa-bell </v-icon>
                    </v-btn>
                </v-badge>
            </template>
            Notifications
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn class="mr-4" small icon href="https://github.com/Hidden-JVC/hidden-jvc-extension/blob/master/docs/guide.md" target="_blank" v-on="on">
                    <v-icon small> fas fa-question-circle </v-icon>
                </v-btn>
            </template>
            Aide
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn class="mr-4" small icon href="https://hiddenjvc.com/database-backups/" target="_blank" v-on="on">
                    <v-icon small> fas fa-database </v-icon>
                </v-btn>
            </template>
            Sauvegardes de la base de données
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn class="mr-4" small icon href="https://github.com/Hidden-JVC/hidden-jvc-website" target="_blank" v-on="on">
                    <v-icon v-on="on" small> fab fa-github </v-icon>
                </v-btn>
            </template>
            Repo github
        </v-tooltip>

        <UserLogin v-if="$store.state.user.user === null" />
        <UserProfile v-if="$store.state.user.user !== null" />
    </v-app-bar>
</template>

<script>

import UserLogin from './UserLogin';
import UserProfile from './UserProfile';

export default {
    name: 'AppBar',

    components: {
        UserLogin,
        UserProfile
    }
};
</script>