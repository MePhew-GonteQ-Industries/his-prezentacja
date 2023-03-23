<script setup lang="ts">
import { ref } from 'vue';
import overheadCam from '@/assets/drg-displays-2.jpg';
import handheldCam from '@/assets/handheld.jpg';
import cupolaCam from '@/assets/cupola.jpg';
import trunkCam from '@/assets/trunk.jpg';
import noConnectionCam from '@/assets/no-connection.jpg';

const cameras = [
  {
    name: 'Overhead',
    preview: overheadCam,
  },
  {
    name: 'Handheld',
    preview: handheldCam,
  },
  {
    name: 'Forward nose',
    preview: cupolaCam,
  },
  {
    name: 'Trunk',
    preview: trunkCam,
  },
  {
    name: 'Falcon 9',
    preview: noConnectionCam,
  },
];

const currentPreviewCamera = ref(0);
const currentTransmittingCamera = ref(0);
</script>

<template>
  <div class="settings-subpage video-settings">
    <h1>video settings</h1>
    <div class="video-settings-container">
      <div class="camera-preview-selection">
        <ul>
          <li
            v-for="(camera, index) in cameras"
            :key="index"
            class="camera-selection"
            :class="{ active: currentPreviewCamera == index }"
            @click="currentPreviewCamera = index"
          >
            <span class="camera-num">cam {{ index + 1 }}</span>
            <span class="camera-name">{{ camera.name }}</span>
          </li>
        </ul>
      </div>

      <div class="camera-container">
        <img class="camera-preview" :src="cameras[currentPreviewCamera].preview" />
      </div>

      <div class="transmitting-camera-selection">
        <p>transmitting camera</p>
        <ul>
          <li
            v-for="(camera, index) in cameras"
            :key="index"
            class="camera-selection"
            :class="{ active: currentTransmittingCamera == index }"
            @click="currentTransmittingCamera = index"
          >
            <span class="camera-num">cam {{ index + 1 }}</span>
            <span class="camera-name">{{ camera.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-settings-container {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  max-height: 50vh;
  justify-items: center;

  .camera-preview-selection {
    margin: 0 1rem;

    ul {
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style-type: none;
      .camera-selection {
        display: flex;
        flex-direction: column;
        border-left: 4px solid transparent;
        padding-left: 5px;
        cursor: pointer;

        &.active {
          border-color: white;

          .camera-name {
            font-weight: bold;
          }
        }

        .camera-num {
          font-size: 0.8rem;
        }

        .camera-name {
          font-weight: 500;
        }
      }
    }

    .camera-num {
      text-transform: uppercase;
    }
  }

  .camera-container {
    height: 60vh;
    width: 80%;
    text-align: center;

    .camera-preview {
      height: 100%;
      width: 100%;
      border: 1px solid #585d7c;
      border-radius: 1rem;
    }
  }

  .transmitting-camera-selection {
    p {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.8rem;
      text-align: center;
      padding: 0.2rem;
    }

    ul {
      padding: 0;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      border: 1px solid white;
      width: 15vw;
      .camera-selection {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem 0;
        cursor: pointer;

        &.active {
          background-color: white;
          color: #020738;
        }

        .camera-num {
          font-size: 0.8rem;
        }

        .camera-name {
          font-weight: 500;
        }

        &.active .camera-name {
          font-weight: bold;
        }
      }
    }

    .camera-num {
      text-transform: uppercase;
    }
  }
}
</style>
