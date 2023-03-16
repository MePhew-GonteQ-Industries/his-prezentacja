<script setup lang="ts">
import { NButton } from "naive-ui";
import { PhList } from "@phosphor-icons/vue";
import { ref } from 'vue';

const counterTargetT = ref(1800);

const targetT = ref();
const interialVelocity = ref(69);
const altitude = ref(32);
const apogee = ref(25);
const perigee = ref(47);
const inclination = ref(62);

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const changeTargetT = () => {
  if (counterTargetT.value > 0) {
    counterTargetT.value--;
  } else {
    counterTargetT.value = 1800;
  }

  let hour, min, sec;
  if (Math.floor(counterTargetT.value / 3600) < 10) {
    hour = `0${Math.floor(counterTargetT.value / 3600)}`;
  } else {
    hour = Math.floor(counterTargetT.value / 3600);
  }
  if (Math.floor((counterTargetT.value % 3600) / 60) < 10) {
    min = `0${Math.floor((counterTargetT.value % 3600) / 60)}`;
  } else {
    min = Math.floor((counterTargetT.value % 3600) / 60);
  }
  if (counterTargetT.value % 60 < 10) {
    sec = `0${counterTargetT.value % 60}`;
  } else {
    sec = counterTargetT.value % 60;
  }
  targetT.value = (`${hour}:${min}:${sec}`);
};

const changeData = () => {
  interialVelocity.value = getRandomNumber(0, 100);
  altitude.value = getRandomNumber(0, 100);
  apogee.value = getRandomNumber(0, 100);
  perigee.value = getRandomNumber(0, 100);
  inclination.value = getRandomNumber(0, 100);
};

changeTargetT();
changeData();

setInterval(changeTargetT, 1000);
setInterval(changeData, 2500);
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
      <p class="time-left">T - {{ targetT }}</p>
    </div>
    <div class="orbit-data-container">
      <div class="orbit-data">
        <p class="data-title">Inertial velocity</p>
        <p class="data-content">7.{{ interialVelocity }}km/s</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Altitude</p>
        <p class="data-content">393.{{ altitude }}km</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Apogee</p>
        <p class="data-content">416.{{ apogee }}km</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Perigee</p>
        <p class="data-content">379.{{ perigee }}km</p>
      </div>
      <div class="orbit-data">
        <p class="data-title">Inclination</p>
        <p class="data-content">51.{{ inclination }}°</p>
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
      width: 135px;
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
