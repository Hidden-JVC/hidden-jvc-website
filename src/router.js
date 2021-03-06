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
            path: '/users/:userName',
            component: () => import(/* webpackChunkName: "User" */ './views/User.vue')
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
        },
        {
            path: '*',
            component: () => import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

export default router;
