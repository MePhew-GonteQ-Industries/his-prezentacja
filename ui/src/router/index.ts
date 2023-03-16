import { createRouter, createWebHistory } from 'vue-router';
import PanelView from '@/views/PanelView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PanelView,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/panel/pages/TheHomePage.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/SettingsView.vue'),
        },
        {
          path: 'game-spectator',
          name: 'gameSpectator',
          component: () => import('@/views/GameViewSpectator.vue'),
        },
        {
          path: 'placeholder',
          name: 'placeholder',
          component: () => import('@/views/PlaceholderView.vue'),
        },
      ],
    },
    {
      path: '/join-game',
      name: 'joinGame',
      component: () => import('@/views/JoinGameView.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameViewClient.vue'),
    },
  ],
});

export default router;
