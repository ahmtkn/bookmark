import {createRouter, createWebHashHistory} from "vue-router";
import store from "@/store";

const routes = [
    {
        name: 'HomePage',
        path: '/',
        component: () => import('@/views/HomePage.vue')
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('@/views/LoginPage.vue')
    },
    {
        name: 'RegisterPage',
        path: '/register',
        component: () => import('@/views/RegisterPage.vue')
    },
    {
        name: 'NewBookmark',
        path: '/new',
        component: () => import('@/views/NewBoomark.vue')
    },
];
const router = createRouter({
    routes,
    history: createWebHashHistory()
})
router.beforeEach((to,from,next) => {
    const isAuth = store.getters._isAuthenticated;
    const requiredValidated = ['HomePage']
    const unAuthenticated = ['LoginPage', 'RegisterPage']

    if (unAuthenticated.indexOf(to.name) > -1 && isAuth)next(false)
    if (requiredValidated.indexOf(to.name) > -1){
        if (isAuth) next();
        else next({name: 'LoginPage'});
    } else {
        next();
    }

});
export default router;