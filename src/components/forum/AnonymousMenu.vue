<template>
    <v-card outlined>
        <v-card-title class="subtitle-2 pa-2" style="background-color: #303436;">
            Compte anonyme
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col>
                    <v-text-field v-model.trim="name" ref="name" class="mb-4" placeholder="Pseudo" outlined dense hide-details :disabled="!edit" />
                    <v-btn v-show="!edit" @click="toggleOn()" class="secondary" small block> Modifier </v-btn>
                    <v-btn v-show="edit" @click="save()" color="primary" small block> Enregistrer </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'AnonymousMenu',

    data: () => ({
        name: '',
        edit: false
    }),

    methods: {
        toggleOn() {
            this.edit = true;
            setTimeout(() => {
                this.$refs.name.focus();
            }, 0);
        },

        async save() {
            this.$store.commit('user/setAnonymousName', this.name);
            this.edit = false;
        }
    },

    created() {
        this.name = this.$store.state.user.anonymousName;
    }
};
</script>