import { createRouter, createWebHistory } from 'vue-router';
import DemoUiView from '../views/DemoUiView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DemoUiView,
      // component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
