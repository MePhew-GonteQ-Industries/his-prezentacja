import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const uiState = ref('spacex');

  const socket = ref();

  const uiModeSpacex = computed(() => uiState.value === 'spacex');

  return { uiState, uiModeSpacex, socket };
});
