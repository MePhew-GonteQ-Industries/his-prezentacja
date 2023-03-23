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
          redirect: { name: 'videoSettings' },
          children: [
            {
              path: 'audio',
              name: 'audioSettings',
              component: () => import('@/components/panel/settings/AudioSettings.vue'),
            },
            {
              path: 'cabin-lighting',
              name: 'cabinLightingSettings',
              component: () => import('@/components/panel/settings/CabinLightingSettings.vue'),
            },
            {
              path: 'video',
              name: 'videoSettings',
              component: () => import('@/components/panel/settings/VideoSettings.vue'),
            },
          ],
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
