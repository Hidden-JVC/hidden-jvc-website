import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/account',
            component: () => import(/* webpackChunkName: "Account" */ './views/Account.vue')
        },
        {
            path: '/forums',
            component: () => import(/* webpackChunkName: "Forums" */ './views/Forums.vue')
        },
        {
            path: '/forums/:forumId/hidden',
            component: () => import(/* webpackChunkName: "HiddenForum" */ './views/hidden/Forum.vue')
        },
        {
            path: '/forums/:forumId/hidden/:topicId',
            component: () => import(/* webpackChunkName: "HiddenTopic" */ './views/hidden/Topic.vue')
        },
        {
            path: '/logs',
            component: () => import(/* webpackChunkName: "Logs" */ './views/Logs.vue')
        }
    ]
});

export default router;
