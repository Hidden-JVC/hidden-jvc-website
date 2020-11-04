<template>
    <v-app-bar app dense clipped-left>
        <v-toolbar-title> Hidden JVC </v-toolbar-title>

        <v-toolbar-items class="hidden-sm-and-down ml-4 d-none">
            <v-btn class="text-capitalize" to="/forums" text dark>
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
        </v-toolbar-items>

        <!-- <v-spacer />

        <span>
            <h2 class="d-inline-block primary--text mr-4">
                Forum Blabla 18-25 ans
            </h2>

            <v-icon x-small> fa fa-users </v-icon>
            0 connecté(s)
        </span> -->

        <v-spacer />

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <a href="https://http://hiddenjvc.com/" target="_blank">
                    <v-icon class="mr-4" v-on="on" small> fas fa-database </v-icon>
                </a>
            </template>
            Sauvegardes de la base de données
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <a href="https://github.com/Hidden-JVC/hidden-jvc-extension" target="_blank">
                    <v-icon class="mr-4" v-on="on" small> fab fa-github </v-icon>
                </a>
            </template>
            Repo github
        </v-tooltip>

        <!-- <v-badge :content="6" class="mr-6">
            <v-icon class="mr-2" small> fas fa-bell </v-icon>
        </v-badge> -->

        <UserLogin v-if="$store.state.user.userId === null" />
        <UserProfile v-if="$store.state.user.userId !== null" />
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