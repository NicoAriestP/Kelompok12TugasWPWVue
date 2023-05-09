import { createWebHistory, createRouter } from 'vue-router'


const routes = [
	{
		path: '/',
		component: import('../pages/Home.vue')
	},
	{
		path: '/products',
		component: import('../pages/Home.vue')
	},
	{
        path: '/about',
        component: import('../pages/About.vue')
	}
]
const router = createRouter({
	history: createWebHistory(),
	routes, //same --- > routes:routes
})
export default router