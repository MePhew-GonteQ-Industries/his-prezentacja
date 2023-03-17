<script setup lang="ts">
import { PhCornersOut } from '@phosphor-icons/vue';
import { NButton } from 'naive-ui';
import { ref } from 'vue';

defineProps({
  photo: String,
})

const image = ref<null | HTMLElement>(null);

const toggleFullscreen = () => {
  if (document.fullscreenElement === null) {
    image.value?.requestFullscreen();
  }

  if (document.fullscreenElement !== null) {
    document.exitFullscreen();
  }
};
</script>


<template>
  <div class="photo-container slide" ref="image">
    <img :src="photo" alt="">
    <NButton @click="toggleFullscreen" ghost color="#20FBFD" class="fullscreen-toggle">
      <PhCornersOut :size="32" weight="light" />
    </NButton>
  </div>
</template>

<style scoped lang="scss">
.photo-container {
  display: flex;
  flex-direction: column;

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 1rem;
    border: 1px solid #585D7C;
    position: relative;
  }

  .fullscreen-toggle {
    position: absolute;
    right: 5%;
    bottom: 5%;
  }
}
</style>
