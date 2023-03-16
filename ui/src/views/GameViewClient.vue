<script setup lang="ts">
import { Application, Sprite, ParticleContainer, Rectangle } from 'pixi.js';
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

let pixieCanvas: HTMLCanvasElement;
let app: Application;
let falcon9Sprite: Sprite;
let emitter_left: Emitter;
let emitter_right: Emitter;

const mainStore = useMainStore();

const { socket } = storeToRefs(mainStore);

function resize() {
    // const width =
    //     document.fullscreenEnabled && document.fullscreenElement === pixieCanvas
    //         ? window.screen.width
    //         : pixieCanvas.parentElement?.offsetWidth;
    // const height =
    //     document.fullscreenEnabled && document.fullscreenElement === pixieCanvas
    //         ? window.screen.height
    //         : PIXIE_WINDOW_HEIGHT;
    const width = document.body.offsetWidth - 2;
    const height = pixieCanvas.parentElement?.clientHeight;

    app.renderer.resize(width, height ? height : document.body.clientHeight);

    falcon9Sprite.x = app.screen.width / 2;
    falcon9Sprite.y = app.screen.height / 2;
    emitter_left.updateSpawnPos(app.screen.width / 2 - 10, app.screen.height / 2 + 120);
    emitter_right.updateSpawnPos(app.screen.width / 2 + 10, app.screen.height / 2 + 120);
    if (app.stage.hitArea) {
        app.stage.hitArea.width = width;
        app.stage.hitArea.height = height;
    }
}

const sendPos = () => {
    socket.value.emit('posX', falcon9Sprite.x);
    socket.value.emit('posY', falcon9Sprite.y);
    socket.value.emit('rotation', falcon9Sprite.rotation);
};

onMounted(() => {
    pixieCanvas = document.getElementById('pixi-canvas') as HTMLCanvasElement;

    const interval = setInterval(sendPos, 200);

    app = new Application({
        view: pixieCanvas,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0x111B52,
    });

    onUnmounted(() => {
        clearInterval(interval);
    });

    window.addEventListener('resize', resize);

    falcon9Sprite = Sprite.from(falcon9);

    falcon9Sprite.anchor.set(0.5);

    app.stage.addChild(falcon9Sprite);

    const particleContainer = new ParticleContainer();
    app.stage.addChild(particleContainer);

    emitter_left = new Emitter(particleContainer, upgradeConfig(particleSettings, [fire, particle]));
    emitter_left.autoUpdate = true;
    emitter_left.updateSpawnPos(app.screen.width / 2 - 10, app.screen.height / 2 + 120);
    emitter_left.emit = true;

    emitter_right = new Emitter(particleContainer, upgradeConfig(particleSettings, [fire, particle]));
    emitter_right.autoUpdate = true;
    emitter_right.updateSpawnPos(app.screen.width / 2 + 10, app.screen.height / 2 + 120);
    emitter_right.emit = true;

    app.stage.hitArea = new Rectangle(0, 0, document.body.offsetWidth - 2, pixieCanvas.parentElement?.clientHeight);

    app.stage.hitArea = new Rectangle(0, 0, document.body.offsetWidth - 2, pixieCanvas.parentElement?.clientHeight);

    app.stage.eventMode = "dynamic";

    resize();

    const engineRightFiring = ref(false);
    const engineLeftFiring = ref(false);

    const fireEngineRight = () => {
        engineRightFiring.value = true;
    }

    const fireEngineLeft = () => {
        engineLeftFiring.value = true;
    }

    const handleClick = (e: PointerEvent) => {
        const { clientX } = e;

        if (clientX <= app.screen.width / 2) {
            fireEngineLeft();
        } else {
            fireEngineRight();
        }
    }

    const stopFiring = (e: PointerEvent) => {
        const { clientX } = e;

        if (clientX <= (app.screen.width / 2)) {
            engineLeftFiring.value = false;
        } else {
            engineRightFiring.value = false;
        }
    }

    app.stage.on('pointerdown', handleClick);
    app.stage.on('pointerup', stopFiring);

    const rocketSpeed = ref(0);
    const rocketRotationSpeed = ref(0);

    app.ticker.add((delta) => {
        falcon9Sprite.x += rocketSpeed.value * delta;
        falcon9Sprite.y += rocketSpeed.value * delta;
        falcon9Sprite.rotation += (rocketRotationSpeed.value * delta);

        emitter_left.updateSpawnPos(falcon9Sprite.x - 15, falcon9Sprite.y + 140);
        emitter_right.updateSpawnPos(falcon9Sprite.x + 15, falcon9Sprite.y + 140);
    })

    const MIN_ROCKET_SPEED = -1;
    const MAX_ROCKET_SPEED = 1;

    const MAX_ROCKET_ROTATION_SPEED = .01;
    const MIN_ROCKET_ROTATION_SPEED = -.01;

    app.ticker.add((delta) => {
        if (engineLeftFiring.value) {
            if (rocketSpeed.value < MAX_ROCKET_SPEED) {
                rocketSpeed.value += .1;
            }

            if (rocketRotationSpeed.value < MAX_ROCKET_ROTATION_SPEED) {
                rocketRotationSpeed.value += .1;
            }
        }

        if (engineRightFiring.value) {
            if (rocketSpeed.value < MAX_ROCKET_SPEED) {
                rocketSpeed.value += .1;
            }

            if (rocketRotationSpeed.value > MIN_ROCKET_ROTATION_SPEED) {
                rocketRotationSpeed.value -= .1;
            }
        }

        if (rocketSpeed.value > MIN_ROCKET_SPEED) {
            rocketSpeed.value -= .05;
        }
    })
});

const toggleFullscreen = () => {
    pixieCanvas.requestFullscreen();
};
</script>

<template>
    <div class="game-panel">
        <div id="pixi-content"><canvas id="pixi-canvas" /></div>
        <div class="controls">
            <NButton @click="toggleFullscreen" ghost color="white">
                <PhCornersOut :size="64" weight="light" />
            </NButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-panel {
    border: 1px solid #adb0c2;
    display: grid;
    grid-template-rows: 92svh 8svh;

    .controls {
        border-top: 1px solid #adb0c2;
        background-color: #020738;
        display: flex;
        align-items: center;

        .n-button {
            height: 100%;
            aspect-ratio: 1/1;
        }
    }
}
</style>
