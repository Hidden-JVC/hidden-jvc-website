<template>
    <v-navigation-drawer app clipped style="max-height: calc(100% - 48px - 24px)">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Hidden JVC
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list dense>
            <v-list-group>
                <template v-slot:activator>
                    <v-list-item-title> Forums </v-list-item-title>
                </template>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon> fas fa-user </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title> azeqsd </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn color="primary" block> Paramètres </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>