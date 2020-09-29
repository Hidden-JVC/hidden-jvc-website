<template>
    <v-app style="overflow-x: hidden" >
        <v-main>
            <AppBar />

            <NavigationDrawer />

            <router-view />
        </v-main>

        <v-overlay :value="$store.state.application.loading" z-index="999">
            <v-progress-circular indeterminate size="64" />
        </v-overlay>
    </v-app>
</template>

<script>
import AppBar from './components/appbar/AppBar.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';

export default {
    name: 'App',

    components: {
        AppBar,
        NavigationDrawer
    },

    created() {
        this.$store.commit('user/loadFromLocalStorage');
    }
};
</script>
