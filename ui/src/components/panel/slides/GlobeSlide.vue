<script setup lang="ts">
import { NButton } from 'naive-ui';
</script>


<template>
  <div class="globe slide">
    <img class="globe-img" src="@/assets/globe.svg" alt="Globe">
    <div class="target-coordinates">
      <div class="coordinate">
        <p class="title">target latitude</p>
        <p class="value">26°15.00°N</p>
      </div>
      <div class="coordinate">
        <p class="title">target longitude</p>
        <p class="value">26°15.00°N</p>
      </div>
    </div>
    <div class="camera-mode">
      <p class="title">camera</p>
      <p class="mode">Auto - Earth IO</p>
      <NButton ghost color="white" round size="large" class="camera-settings-btn">settings
      </NButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.globe {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .globe-img {
    width: 55%;
    pointer-events: none;
  }

  .target-coordinates {
    display: flex;
    gap: 1rem;

    .coordinate {
      p {
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }

  .camera-mode {
    position: absolute;
    bottom: 5%;
    right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .5rem;

    p {
      font-weight: bold;
      text-align: center;
    }

    .title {
      text-transform: uppercase;
    }
  }
}
</style>
