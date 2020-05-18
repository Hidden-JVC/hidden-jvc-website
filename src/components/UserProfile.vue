<template>
    <v-menu :close-on-content-click="false" offset-y :nudge-width="250">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" small>
                <v-icon small left> fas fa-user </v-icon>
                Connexion
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="primary darken-1 py-1">
                Connexion
            </v-card-title>

            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-text-field label="Pseudo" hide-details outlined dense />
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-text-field label="Mot de passe" hide-details outlined dense />
                    </v-list-item-content>
                </v-list-item>
            </v-list>


            <v-card-actions>
                <v-btn color="primary darken-1" small>
                    Se connecter
                </v-btn>

                <v-spacer />

                <v-btn color="orange darken-4" small>
                    S'inscrire
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>