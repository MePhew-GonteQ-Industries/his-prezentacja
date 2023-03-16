<script setup lang="ts">
import TheFooter from '@/components/panel/TheFooter.vue';
</script>

<template>
  <div class="panel">
    <main>
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.panel {
  border: 1px solid #adb0c2;
  height: 100vh;
  display: grid;
  grid-template-rows: 92vh 8vh;
  overflow: hidden;

  @media (min-height: 900px) {
    grid-template-rows: 94vh 6vh;
  }

  * {
    font-family: 'Raleway', sans-serif;
    font-feature-settings: 'pnum' on, 'lnum' on;
    box-sizing: border-box;
    color: white;
  }

  main {
    background-color: #020738;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-bottom: 1px solid white;
  }
}
</style>
