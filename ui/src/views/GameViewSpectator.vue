<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import { io } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { useMessage, NButton } from 'naive-ui';
import { PhCornersOut } from '@phosphor-icons/vue';
import { Application, Sprite, ParticleContainer, Texture } from 'pixi.js';
import { Actions, Interpolations } from 'pixi-actions';
import { Engine } from '@/views/GameViewClient.vue';
import falcon9 from '@/components/sprites/falcon_9_block_5_legs_deployed.png';
import particle from '@/components/sprites/particle.png';
import fire from '@/components/sprites/fire.png';
import * as particleSettings from '@/emitter.json';
import { Emitter, upgradeConfig } from '@pixi/particle-emitter';

const mainStore = useMainStore();

const { socket } = storeToRefs(mainStore);

const messageBox = useMessage();

class Rocket extends Sprite {
  id: string;
  name: string;
  speedX: number;
  speedY: number;
  rotationSpeed: number;

  constructor(
    id: string,
    name: string,
    x: number,
    y: number,
    rotation: number,
    texture: Texture = Texture.from(falcon9),
    speedX: number = 0,
    speedY: number = 0,
    rotationSpeed: number = 0,
  ) {
    super(texture);
    this.id = id;
    this.name = name;
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.speedX = speedX;
    this.speedY = speedY;
    this.rotationSpeed = rotationSpeed;
  }
}

interface PlayerPosition {
  id: string;
  name: string;
  posX: number;
  posY: number;
  rotation: number;
}

class RocketGameSpectator {
  private _SCREEN_BG_COLOR: number = 0x111b52;

  private _app!: Application;

  private _rockets: { [key: string]: Rocket } = {};
  private _players: { [key: string]: string } = {};
  private _socket;
  private _pixieCanvas!: HTMLCanvasElement;

  private _leftEmitter!: Emitter;
  private _rightEmitter!: Emitter;

  private _rightEngineFiring: Boolean = false;
  private _leftEngineFiring: Boolean = false;

  constructor(socket) {
    this._socket = socket;
  }

  initialize = () => {
    this._initCanvas();
    this._createApplication();
    this._registerResizeHandler();

    this._initSocket();

    // this._createRocket();
    // this._createParitcleEmitters();

    this._resizeHandler();
  };

  private _initSocket() {
    if (!this._socket.value) {
      this._socket.value = io('http://localhost:4000');
    }
    this._joinSpectatorsRoom();

    this._registerOnMessageHandler();
    this._registerOnPosUpdateHandler();

    this._registerConnectHandler();
    this._registerDisconnectHandler();
  }

  private _joinSpectatorsRoom = () => {
    this._socket.value.emit('joinRoom', 'spectators');
  };

  private _registerOnMessageHandler = () => {
    this._socket.value.on('message', (message: string) => {
      messageBox.info(message);
    });
  };

  private _registerConnectHandler = () => {
    this._socket.value.on('playerConnected', (name: string, id: string) => {
      messageBox.success(`${name} dołącza`);
      this._addPlayer(id, name);
    });
  };

  private _addPlayer(id: string, name: string) {
    this._players[id] = name;
  }

  private _registerDisconnectHandler = () => {
    this._socket.value.on('playerDisconnected', (name: string, id: string) => {
      this._removeRocket(id);
    });
  };

  private _registerOnPosUpdateHandler = () => {
    this._socket.value.on('position', (playerPosition: PlayerPosition) => {
      const rocket = this._rockets[playerPosition.id];

      if (!rocket) {
        this._addRocket(
          playerPosition.id,
          playerPosition.name,
          playerPosition.posX,
          playerPosition.posY,
          playerPosition.rotation,
        );

        return rocket;
      }

      rocket.x = playerPosition.posX;
      rocket.y = playerPosition.posY;
      rocket.rotation = playerPosition.rotation;
    });
  };

  private _createApplication = () => {
    this._app = new Application({
      view: this._pixieCanvas,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: this._SCREEN_BG_COLOR,
    });
  };

  private _initCanvas = () => {
    this._pixieCanvas = document.getElementById('pixi-canvas') as HTMLCanvasElement;
  };

  private _addRocket = (
    id: string,
    name: string,
    posX: number = 0,
    posY: number = 0,
    rotation: number = 0,
  ) => {
    const rocket = new Rocket(id, name, posX, posY, rotation);
    this._rockets[id] = rocket;
    this._app.stage.addChild(rocket);
    return rocket;
  };

  private _createParitcleEmitters = () => {
    const particleContainer = new ParticleContainer();
    this._app.stage.addChild(particleContainer);

    this._leftEmitter = new Emitter(
      particleContainer,
      upgradeConfig(particleSettings, [fire, particle]),
    );
    this._leftEmitter.autoUpdate = true;
    this._leftEmitter.updateSpawnPos(
      this._app.screen.width / 2 - 10,
      this._app.screen.height / 2 + 120,
    );
    this._leftEmitter.emit = false;

    this._rightEmitter = new Emitter(
      particleContainer,
      upgradeConfig(particleSettings, [fire, particle]),
    );
    this._rightEmitter.autoUpdate = true;
    this._rightEmitter.updateSpawnPos(
      this._app.screen.width / 2 + 10,
      this._app.screen.height / 2 + 120,
    );
    this._rightEmitter.emit = false;
  };

  private _resizeHandler = () => {
    const width = document.body.offsetWidth;
    const height = this._pixieCanvas.parentElement?.clientHeight ?? 0;

    this._app.renderer.resize(width, height);

    // this._rocket.x = this._app.screen.width / 2;
    // this._rocket.y = this._app.screen.height / 2;

    // this._leftEmitter.updateSpawnPos(
    //   this._app.screen.width / 2 - 10,
    //   this._app.screen.height / 2 + 120,
    // );
    // this._rightEmitter.updateSpawnPos(
    //   this._app.screen.width / 2 + 10,
    //   this._app.screen.height / 2 + 120,
    // );
  };

  private _registerResizeHandler = () => {
    window.addEventListener('resize', this._resizeHandler);
  };

  toggleFullscreen = () => {
    if (this._pixieCanvas) {
      this._pixieCanvas.requestFullscreen();
    }
  };
}

const rocketGameClient = new RocketGameSpectator(socket);

onMounted(() => {
  rocketGameClient.initialize();
});
</script>

<template>
  <div class="game-panel">
    <div id="pixi-content"><canvas id="pixi-canvas" /></div>
    <div class="controls">
      <NButton ghost color="white">
        <PhCornersOut :size="30" weight="light" />
      </NButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-panel {
  display: grid;
  height: 100%;
  grid-template-rows: 95% calc(5% - 1px);

  #pixi-content {
    border-bottom: 1px solid white;
  }

  .controls {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 2rem;

    .n-button {
      padding: 0;
      height: 100%;
      aspect-ratio: 1/1;
      background-color: #111b52;
    }
  }
}
</style>
