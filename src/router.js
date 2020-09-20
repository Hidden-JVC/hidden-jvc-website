import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/forums',
            component: () => import(/* webpackChunkName: "Forums" */ './views/Forums.vue')
        },
        {
            path: '/forums/:forumId',
            component: () => import(/* webpackChunkName: "Forum" */ './views/Forum.vue')
        }
    ]
});

export default router;
