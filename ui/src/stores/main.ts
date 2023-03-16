import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const uiState = ref('spaceX');

  const uiModeSpacex = computed(() => uiState.value === 'spacex');

  return { uiState, uiModeSpacex };
});
