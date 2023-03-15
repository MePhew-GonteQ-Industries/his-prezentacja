import { createRouter, createWebHistory } from 'vue-router';
import DemoUiView from '@/views/DemoUiView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DemoUiView,
    },
    {
      path: '/name',
      name: 'name',
      component: () => import('@/views/NameUiView.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameUiView.vue'),
    },
  ],
});

export default router;
