import { createRouter, createWebHashHistory} from 'vue-router'
import Home from "../views/Home.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
    {
        path: "/",
        name: 'home',
        component: Home
    },
    {
        path: "/login",
        name: 'login',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.webToken ? true: false
    if (to.path == '/login' || to.path == '/register'){
        next()
    }else {
        isLogin ? next() : next('/login')
    }
})

export default router