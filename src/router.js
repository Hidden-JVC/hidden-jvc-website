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
            path: '/forums/:forumId/hidden',
            component: () => import(/* webpackChunkName: "Forum" */ './views/Forum.vue')
        },
        {
            path: '/forums/:forumId/:topicId',
            component: () => import(/* webpackChunkName: "Topic" */ './views/Topic.vue')
        }
    ]
});

export default router;
