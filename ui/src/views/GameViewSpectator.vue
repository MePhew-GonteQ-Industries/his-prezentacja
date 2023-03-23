<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { io } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { useMessage, NButton } from 'naive-ui';
import { PhCornersOut } from '@phosphor-icons/vue';
import { Application, Sprite, Texture, TextStyle, Container, Text } from 'pixi.js';
import falcon9 from '@/components/sprites/falcon_9_block_5_legs_deployed.png';
import particle from '@/components/sprites/particle.png';
import fire from '@/components/sprites/fire.png';
import * as particleSettings from '@/emitter.json';
import { Emitter, upgradeConfig } from '@pixi/particle-emitter';
import { useQRCode } from '@vueuse/integrations/useQRCode';

const mainStore = useMainStore();

const { socket } = storeToRefs(mainStore);

const messageBox = useMessage();

class Rocket extends Sprite {
  id: string;
  name: string;

  container: Container;

  nicknameText: Text;

  _leftEmitter: Emitter;
  _rightEmitter: Emitter;

  constructor(
    id: string,
    name: string,
    x: number,
    y: number,
    rotation: number,
    container: Container,
    texture: Texture = Texture.from(falcon9),
  ) {
    super(texture);
    this.id = id;
    this.name = name;
    this.anchor.set(0.5);
    this.rotation = rotation;
    this.container = container;

    this.container.x = x;
    this.container.y = y;

    const styly: TextStyle = new TextStyle({
      align: 'center',
      fill: '#ffffff',
      fontSize: 20,
    });
    this.nicknameText = new Text(this.name, styly);
    this.container.addChild(this.nicknameText);

    this.container.addChild(this);

    this._leftEmitter = new Emitter(
      this.container,
      upgradeConfig(particleSettings, [fire, particle]),
    );
    this._leftEmitter.autoUpdate = true;
    this._leftEmitter.emit = true;
    this._leftEmitter.updateSpawnPos(-15, 150);

    this._rightEmitter = new Emitter(
      this.container,
      upgradeConfig(particleSettings, [fire, particle]),
    );
    this._rightEmitter.autoUpdate = true;
    this._rightEmitter.emit = true;
    this._rightEmitter.updateSpawnPos(15, 150);
  }

  updatePos = (x: number, y: number, rotation: number) => {
    if (this.container.y > y) {
      if (this.container.x < x) {
        this._leftEmitter.emit = true;

        setTimeout(() => {
          this._leftEmitter.emit = false;
        }, 200);
      } else {
        this._rightEmitter.emit = true;

        setTimeout(() => {
          this._rightEmitter.emit = false;
        }, 200);
      }
    }

    this.rotation = rotation;

    this.nicknameText.y = -150;

    this._leftEmitter.rotate(rotation);
    this._rightEmitter.rotate(rotation);

    this.container.x = x;
    this.container.y = y;
    this.rotation = rotation;
  };
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

  private _rockets: { [key: string]: null | Rocket } = {};
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

    this._resizeHandler();
  };

  private _initSocket() {
    if (!this._socket.value) {
      this._socket.value = io(import.meta.env.VITE_API_URL);
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
    });
  };

  private _registerDisconnectHandler = () => {
    this._socket.value.on('playerDisconnected', (name: string, id: string) => {
      this._removeRocket(id);
    });
  };

  private _registerOnPosUpdateHandler = () => {
    this._socket.value.on('position', (playerPosition: PlayerPosition) => {
      const rocket = this._rockets[playerPosition.id];

      if (playerPosition.name === '' || playerPosition.name === undefined) {
        if (rocket) this._removeRocket(playerPosition.id);

        return null;
      }

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

      const { posX, posY, rotation } = playerPosition;

      rocket.updatePos(posX, posY, rotation);
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
    const rocketContainer = new Container();
    this._app.stage.addChild(rocketContainer);
    const rocket = new Rocket(id, name, posX, posY, rotation, rocketContainer);
    this._rockets[id] = rocket;
    return rocket;
  };

  private _removeRocket(id: string) {
    this._rockets[id]?.container.destroy();
    this._rockets[id] = null;
  }

  private _resizeHandler = () => {
    const width = document.body.offsetWidth;
    const height = this._pixieCanvas.parentElement?.clientHeight ?? 0;

    this._app.renderer.resize(width, height);
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

const qrcodeRickroll = useQRCode('https://youtu.be/dQw4w9WgXcQ');
const qrcodeGame = useQRCode('https://www.prezentacja.dripsiaga.pl/join-game');
</script>

<template>
  <div class="game-panel">
    <div id="pixi-content"><canvas id="pixi-canvas" /></div>
    <div class="controls">
      <img :src="qrcodeRickroll" alt="QR Code" />
      <h1>https://www.prezentacja.dripsiaga.pl/join-game</h1>
      <img :src="qrcodeGame" alt="QR Code" />
      <NButton ghost color="white" @click="rocketGameClient.toggleFullscreen">
        <PhCornersOut :size="30" weight="light" />
      </NButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-panel {
  display: grid;
  height: 100%;
  grid-template-rows: 78% calc(22% - 1px);
  justify-items: center;

  #pixi-content {
    border-bottom: 1px solid white;
  }

  .controls {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 2rem;
    gap: 5rem;

    h1 {
      font-weight: bold;
      text-decoration: underline;
    }

    img {
      height: 100%;
    }

    .n-button {
      padding: 0;
      height: 100%;
      aspect-ratio: 1/1;
      background-color: #111b52;
    }
  }
}
</style>
