<template>
    <v-btn v-scroll="onScroll" v-show="show" fab fixed bottom right color="primary" x-small @click="$vuetify.goTo(0)">
        <v-icon x-small> fas fa-chevron-up </v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'BackToTopBtn',

    data: () => ({
        show: false
    }),

    methods: {
        onScroll(e) {
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.show = top > 20;
        }
    }
};
</script>