<template>
    <v-navigation-drawer app clipped expand-on-hover>
        <v-list nav>
            <v-list-item to="/">
                <v-list-item-action>
                    <v-icon> fas fa-home </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Accueil </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list-item to="/forums">
                <v-list-item-action>
                    <v-icon> fas fa-comments </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Forums </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/favoris">
                <v-list-item-action>
                    <v-icon> fas fa-star </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Favoris </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/messagerie">
                <v-list-item-action>
                    <v-icon> fas fa-envelope </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Messagerie </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list-item to="/statistiques">
                <v-list-item-action>
                    <v-icon> fas fa-chart-area </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Statistiques </v-list-item-title>
                </v-list-item-content>
            </v-list-item>


            <v-list-item to="/logs">
                <v-list-item-action>
                    <v-icon> fas fa-list </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Logs de modération </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <v-list class="py-0">
                <v-divider />

                <v-list-item to="/settings">
                    <v-list-item-action>
                        <v-icon> fas fa-cog </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title> Paramètres </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'NavigationDrawer'
};
</script>