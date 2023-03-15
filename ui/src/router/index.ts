import { createRouter, createWebHistory } from 'vue-router';
import DemoUiView from '@/views/DemoUiView.vue';
import NameUiView from '@/views/NameUiView.vue';
import GameUiView from '@/views/GameUiView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DemoUiView,
      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/name',
      name: 'name',
      component: NameUiView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameUiView,
    },
  ],
});

export default router;
