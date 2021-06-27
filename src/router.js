import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL, // eslint-disable-line
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "Home" */ './views/Coming.vue')
        },
        {
            path: '/account',
            component: () => import(/* webpackChunkName: "Account" */ './views/Account.vue')
        },
        {
            path: '/users/:userName',
            component: () => import(/* webpackChunkName: "User" */ './views/User.vue')
        },
        {
            path: '/forums',
            component: () => import(/* webpackChunkName: "Forums" */ './views/Coming.vue')
        },
        {
            path: '/forums/:forumId',
            component: () => import(/* webpackChunkName: "Forum" */ './views/Coming.vue')
        },
        {
            path: '/forums/:forumId/hidden',
            component: () => import(/* webpackChunkName: "HiddenForum" */ './views/hidden/Forum.vue')
        },
        {
            path: '/forums/:forumId/hidden/:topicId\\-(.*)',
            component: () => import(/* webpackChunkName: "HiddenTopic" */ './views/hidden/Topic.vue')
        },
        {
            path: '/notifications',
            component: () => import(/* webpackChunkName: "Notifications" */ './views/Notifications.vue')
        },
        {
            path: '/favoris',
            component: () => import(/* webpackChunkName: "Favoris" */ './views/Coming.vue')
        },
        {
            path: '/messagerie',
            component: () => import(/* webpackChunkName: "Messagerie" */ './views/Coming.vue')
        },
        {
            path: '/statistiques',
            component: () => import(/* webpackChunkName: "Statistiques" */ './views/Coming.vue')
        },
        {
            path: '/logs',
            component: () => import(/* webpackChunkName: "Logs" */ './views/Logs.vue')
        },
        {
            path: '/parametres',
            component: () => import(/* webpackChunkName: "Settings" */ './views/Settings.vue')
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
