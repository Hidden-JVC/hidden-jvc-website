<template>
    <v-autocomplete v-model="selectedUser" :loading="isLoading" :no-data-text="noDataText" :items="users" @change="$emit('input', selectedUser)" item-value="Id" item-text="Name" :placeholder="placeholder" hide-details :menu-props="{ offsetY: true }" :search-input.sync="search" outlined dense clearable>
        <template v-slot:selection="data">
            <v-chip v-bind="data.attrs" :input-value="data.selected" @click="data.select" label>
                <v-avatar left>
                    <v-img v-if="data.item.ProfilePicture !== null" :src="data.item.ProfilePicture" />
                    <v-img v-else src="@/assets/larry.png" />
                </v-avatar>
                {{ data.item.Name }}
            </v-chip>
        </template>
        <template v-slot:item="{ item }">
            <v-list-item-avatar>
                <v-img v-if="item.ProfilePicture !== null" :src="item.ProfilePicture" />
                <v-img v-else src="@/assets/larry.png" />
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    {{ item.Name }}
                </v-list-item-title>
            </v-list-item-content>
        </template>
    </v-autocomplete>
</template>

<script>
export default {
    name: 'UsersSelect',

    props: {
        value: { type: Number },
        placeholder: { type: String, default: 'Utilisateur' }
    },

    data: () => ({
        selectedUser: null,
        users: [],
        isLoading: false,
        search: null,
        searchTimeout: null
    }),

    watch: {
        search(search) {
            clearTimeout(this.searchTimeout);

            this.searchTimeout = setTimeout(() => {
                this.makeSearch(search);
            }, 500);
        }
    },

    computed: {
        noDataText() {
            if (!this.search) {
                return 'Tapez pour rechercher un utilisateur';
            } else if (this.isLoading) {
                return 'Chargement...';
            } else {
                return 'Aucun utilisateur trouvé';
            }
        }
    },

    methods: {
        async makeSearch(search) {
            if (typeof search !== 'string' || search.length.length < 3) {
                return;
            }
            if (this.isLoading) {
                return;
            }

            try {
                this.isLoading = true;
                const { users, error } = await this.repos.user.getUsers({ name: search });
                if (error) {
                    this.openErrorDialog(error);
                } else {
                    this.users = users;
                }
            } catch (err) {
                this.openErrorDialog('Une erreur est survenue lors de la récupération des utilisateurs');
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        }
    },

    created() {
        this.selectedUser = this.value;
    }
};
</script>