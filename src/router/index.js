import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/filmes',
      name: 'Movies',
      component: () => import('../views/MoviesView.vue'),
    },
    {
      path: '/tv',
      name: 'TV',
      component: () => import('../views/TvView.vue'),
    },
  ],
})

export default router
