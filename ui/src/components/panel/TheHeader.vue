<script setup lang="ts">
import { NButton } from "naive-ui";
import { PhList } from "@phosphor-icons/vue";
</script>

<template>
  <header>
    <NButton class="menu-btn" ghost color="white"><ph-list :size="26" weight="regular" /></NButton>
    <div class="phase-container">
      <p class="phase-title">Active phase</p>
      <p class="phase-name">Deorbit coast</p>
    </div>
    <div class="time-to-target">
      <p class="time-title">Splashdown time</p>
      <p class="time-left">T - 01:24:51</p>
    </div>
    <div class="orbit-data-container">
      <div class="orbit-data">
        <p class="data-title">Inertial velocity</p>
        <p class="data-content">7.69km/s</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Altitude</p>
        <p class="data-content">393.3km</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Apogee</p>
        <p class="data-content">416.2km</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Perigee</p>
        <p class="data-content">379.4km</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Inclination</p>
        <p class="data-content">51.62°</p>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: #020738;
  border-bottom: 1px solid #adb0c2;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 .5rem;

  .menu-btn {
    height: 70%;
    aspect-ratio: 1/1;
    background-color: #111B52;
  }

  .phase-container {
    display: flex;
    flex-direction: column;

    .phase-title {
      text-transform: uppercase;
      font-size: .8rem;
    }

    .phase-name {
      text-transform: capitalize;
      font-weight: 600;
    }
  }

  .time-to-target {
    margin-left: 10%;

    .time-title {
      text-transform: uppercase;
      font-size: .8rem;
    }

    .time-left {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }

  .orbit-data-container {
    margin-left: 15%;
    display: flex;
    gap: 4rem;

    .data-title {
      text-transform: uppercase;
    }

    .data-content {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
}
</style>
