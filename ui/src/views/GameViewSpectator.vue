<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { io } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { useMessage } from 'naive-ui';

const mainStore = useMainStore();

const messageBox = useMessage();

const { socket } = storeToRefs(mainStore);

if (!socket.value) {
    socket.value = io("http://localhost:4000");
}

socket.value.emit('joinRoom', 'spectators');

socket.value.on('message', (message: string) => {
    messageBox.info(message);
});

socket.value.on('posX', (posX: number, user: string) => {
    console.log(`PosX: ${posX} for user: ${user}`);
});

socket.value.on('posY', (posY: number, user: string) => {
    console.log(`PosY: ${posY} for user: ${user}`);
});

socket.value.on('rotation', (rotation: number, user: string) => {
    console.log(`Rotation: ${rotation} for user: ${user}`);
});
</script>

<template>
    <div>
    </div>
</template>

<style scoped lang="scss">
</style>
