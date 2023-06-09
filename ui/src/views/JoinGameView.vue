<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NInput, NButton, useMessage } from 'naive-ui';
import { io } from 'socket.io-client';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const messageBox = useMessage();

const mainStore = useMainStore();

const { socket } = storeToRefs(mainStore);

if (!socket.value) {
    socket.value = io(import.meta.env.VITE_API_URL);
}

const name = ref();

const router = useRouter();

socket.value.emit('joinRoom', 'players');

socket.value.on('message', (message: string) => {
    messageBox.info(message);
});

socket.value.on('nameRegistered', (message: string) => {
    messageBox.success(message);
    router.push('game');
});

socket.value.on('nameNotRegistered', (message: string) => {
    messageBox.error(message);
});

const saveName = () => {
    if (!name.value) {
        messageBox.error("Musisz podać imię");
    } else {
        socket.value.emit('saveName', name.value);
    }
};
</script>

<template>
    <div class="name-view-wrapper">
        <div class="name-box">
            <h1>Podaj nick</h1>
            <n-input v-model:value="name" type="text" size="large" placeholder="nick her" class="name-input"
                :bordered="false"></n-input>
            <n-button color="#020738" size="large" class="save-button" @click="saveName">Graj</n-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.name-view-wrapper {
    overflow: hidden;
    color: white;
    background-color: #111b52;
    height: 100svh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .name-box {
        background-color: #111b52;
        width: 100%;
        height: 100%;
        border: 1px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;

        .name-input {
            width: 80%;
            border: 1px solid white;
            text-align: center;

            &[type='search']::-webkit-search-decoration,
            &[type='search']::-webkit-search-cancel-button,
            &[type='search']::-webkit-search-results-button,
            &[type='search']::-webkit-search-results-decoration {
                appearance: none;
                -webkit-appearance: none;
            }

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
                -webkit-text-fill-color: white;
                background-color: #111b52 !important;
                color: white;
                transition: background-color 5000s ease-in-out 0s, border-color white;
            }

            &:hover {
                border: 1px solid white !important;
            }
        }

        .save-button {
            width: 80%;
            color: white;
            border: 1px solid white;

            &:hover {
                background-color: #111b52 !important;
            }

            &:focus {
                background-color: #111b52;
            }
        }
    }
}
</style>
