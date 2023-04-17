import {createRouter, createWebHistory} from "vue-router"
import about from "../components/about.vue";

const routes = [
    {
        path:"/about",
        component: about
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;