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

socket.value.on('position', (playerPosition: Object) => {
    console.log(playerPosition);
});
</script>

<template>
    <div>
    </div>
</template>

<style scoped lang="scss"></style>
