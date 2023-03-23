<script lang="ts">
export enum Engine {
    RIGHT = 0,
    LEFT,
}
</script>

<script setup lang="ts">
import { Application, Sprite, ParticleContainer, Rectangle, Texture } from 'pixi.js';
import falcon9 from '@/components/sprites/falcon_9_block_5_legs_deployed.png';
import particle from '@/components/sprites/particle.png';
import fire from '@/components/sprites/fire.png';
import { onMounted, ref, onUnmounted } from 'vue';
import * as particleSettings from '@/emitter.json';
import { Emitter, upgradeConfig } from '@pixi/particle-emitter';
import { PhCornersOut } from '@phosphor-icons/vue';
import { NButton } from 'naive-ui';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import type { Socket } from 'engine.io-client';

const mainStore = useMainStore();

const { socket } = storeToRefs(mainStore);

class Rocket extends Sprite {
    speedX: number;
    speedY: number;
    rotationSpeed: number;

    constructor(
        x: number,
        y: number,
        texture: Texture = Texture.from(falcon9),
        speedX: number = 0,
        speedY: number = 0,
        rotationSpeed: number = 0,
    ) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotationSpeed = rotationSpeed;
    }
}

class RocketGamePlayer {
    private _SEND_POS_INTERVAL_MS: number = 200;
    private _SCREEN_BG_COLOR: number = 0x111b52;

    private _MIN_ROCKET_SPEED_X = -1;
    private _MAX_ROCKET_SPEED_X = 1;

    private _MIN_ROCKET_SPEED_Y = -1;
    private _MAX_ROCKET_SPEED_Y = 1;

    private _MAX_ROCKET_ROTATION_SPEED = 0.01;
    private _MIN_ROCKET_ROTATION_SPEED = -0.01;

    private _app!: Application;

    private _rocket!: Rocket;
    private _socket: typeof ref<Socket>;
    private _pixieCanvas!: HTMLCanvasElement;

    private _sendPosIntervalId!: number;

    private _leftEmitter!: Emitter;
    private _rightEmitter!: Emitter;

    private _rightEngineFiring: Boolean = false;
    private _leftEngineFiring: Boolean = false;

    constructor(socket: typeof ref<Socket>) {
        this._socket = socket;
    }

    initialize = () => {
        this._initCanvas();
        this._createApplication();
        this._registerResizeHandler();

        this._createRocket();
        this._createParitcleEmitters();
        this._createStageHitArea();

        this._resizeHandler();
        this._registerClickHandlerRocketSteering();
        this._registerSendPosInterval();
        this._registergameLoop();
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

    private _createRocket = () => {
        this._rocket = new Rocket(0, 0);
        this._app.stage.addChild(this._rocket);
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

    private _createStageHitArea = () => {
        this._app.stage.hitArea = new Rectangle(0, 0, this._app.screen.width, this._app.screen.height);

        this._app.stage.eventMode = 'dynamic';
    };

    private _sendPos = () => {
        if (this._socket.value) {
            this._socket.value.emit('position', this._rocket.x, this._rocket.y, this._rocket.rotation);
        }
    };

    private _registerSendPosInterval = () => {
        this._sendPosIntervalId = setInterval(this._sendPos, this._SEND_POS_INTERVAL_MS);
    };

    private _resizeHandler = () => {
        const width = document.body.offsetWidth - 2;
        const height = this._pixieCanvas.parentElement?.clientHeight;

        this._app.renderer.resize(width, height ? height : document.body.clientHeight);

        this._rocket.x = this._app.screen.width / 2;
        this._rocket.y = this._app.screen.height / 2;
        this._leftEmitter.updateSpawnPos(
            this._app.screen.width / 2 - 10,
            this._app.screen.height / 2 + 120,
        );
        this._rightEmitter.updateSpawnPos(
            this._app.screen.width / 2 + 10,
            this._app.screen.height / 2 + 120,
        );

        if (this._app.stage.hitArea) {
            // @ts-ignore
            this._app.stage.hitArea.width = width;
            // @ts-ignore
            this._app.stage.hitArea.height = height;
        }
    };

    private _registerResizeHandler = () => {
        window.addEventListener('resize', this._resizeHandler);
    };

    destructor() {
        clearInterval(this._sendPosIntervalId);
    }

    private _toggleEngine = (engine: Engine) => {
        switch (engine) {
            case Engine.LEFT: {
                this._leftEngineFiring = !this._leftEngineFiring;
                this._leftEmitter.emit = !this._leftEmitter.emit;
                break;
            }
            case Engine.RIGHT: {
                this._rightEngineFiring = !this._rightEngineFiring;
                this._rightEmitter.emit = !this._rightEmitter.emit;
                break;
            }
        }
    };

    private _stageClickHandlerRocketSteering = (e: PointerEvent) => {
        const { clientX } = e;

        if (clientX <= this._app.screen.width / 2) {
            this._toggleEngine(Engine.LEFT);
        } else {
            this._toggleEngine(Engine.RIGHT);
        }
    };

    private _registerClickHandlerRocketSteering = () => {
        this._app.stage.on('pointerdown', this._stageClickHandlerRocketSteering);
        this._app.stage.on('pointerup', this._stageClickHandlerRocketSteering);
    };

    private _registergameLoop = () => {
        this._app.ticker.add((delta) => {
            this._rocket.x += this._rocket.speedX * delta;
            this._rocket.y += this._rocket.speedY * delta;

            this._rocket.rotation += (this._rocket.rotationSpeed * delta) / 10;

            this._leftEmitter.updateSpawnPos(this._rocket.x - 15, this._rocket.y + 140);
            this._leftEmitter.rotate(this._rocket.rotation);

            this._rightEmitter.updateSpawnPos(this._rocket.x + 15, this._rocket.y + 140);
            this._rightEmitter.rotate(this._rocket.rotation);

            if (this._leftEngineFiring) {
                if (this._rocket.speedY > this._MIN_ROCKET_SPEED_Y) {
                    this._rocket.speedY -= 0.05;
                }

                if (this._rocket.speedX < this._MAX_ROCKET_SPEED_X) {
                    this._rocket.speedX += 0.01;
                }

                if (
                    !this._rightEngineFiring &&
                    this._rocket.rotationSpeed < this._MAX_ROCKET_ROTATION_SPEED
                ) {
                    this._rocket.rotationSpeed += 0.1;
                }
            }

            if (this._rightEngineFiring) {
                if (this._rocket.speedY > this._MIN_ROCKET_SPEED_Y) {
                    this._rocket.speedY -= 0.05;
                }

                if (this._rocket.speedX > this._MIN_ROCKET_SPEED_X) {
                    this._rocket.speedX -= 0.01;
                }

                if (
                    !this._leftEngineFiring &&
                    this._rocket.rotationSpeed > this._MIN_ROCKET_ROTATION_SPEED
                ) {
                    this._rocket.rotationSpeed -= 0.1;
                }
            }

            if (this._rocket.speedY < this._MAX_ROCKET_SPEED_Y) {
                this._rocket.speedY += 0.01;
            }
        });
    };

    toggleFullscreen = () => {
        if (this._pixieCanvas) {
            this._pixieCanvas.requestFullscreen();
        }
    };

    disconnected = () => {
        this._socket.value.emit("playerDisconnected");
    };
}

const rocketGamePlayer = new RocketGamePlayer(socket);

onMounted(() => {
    rocketGamePlayer.initialize();
});

onUnmounted(() => {
    rocketGamePlayer.disconnected();
});
</script>

<template>
    <div class="game-panel">
        <div id="pixi-content"><canvas id="pixi-canvas" /></div>
        <div class="controls">
            <NButton @click="rocketGamePlayer.toggleFullscreen" ghost color="white">
                <PhCornersOut :size="48" weight="light" />
            </NButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-panel {
    border: 1px solid #adb0c2;
    display: grid;
    grid-template-rows: 92svh calc(8svh - 2px);

    .controls {
        border-top: 1px solid #adb0c2;
        background-color: #020738;
        display: flex;
        align-items: center;

        .n-button {
            padding: 0;
            height: 100%;
            aspect-ratio: 1/1;
        }
    }
}
</style>
