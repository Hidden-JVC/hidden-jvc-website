<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            <v-avatar class="mr-4">
                <v-img v-if="user.ProfilePicture === null" src="@/assets/larry.png" />
                <v-img v-if="user.ProfilePicture !== null" :src="user.ProfilePicture" />
            </v-avatar>

            {{ user.Name }}
        </v-card-title>

        <v-card-text class="pa-2">
            <v-row>
                <v-col align="center" class="py-0">
                    <small> Inscription </small> <br>
                    <span class="white--text"> {{ user.CreationDate | dateFormat() }} </span>
                </v-col>

                <v-col align="center" class="py-0">
                    <small> Messages </small> <br>
                    <span class="white--text"> {{ user.PostCount }} </span>
                </v-col>

                <v-col align="center" class="py-0">
                    <small> Dernière connexion </small> <br>
                    <span class="white--text"> 12/01/2021 </span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'AccountMenu',

    props: {
        user: { required: true, type: Object }
    }
};
</script>