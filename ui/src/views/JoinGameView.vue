<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NInput, NButton, useMessage } from 'naive-ui';
import { io } from 'socket.io-client';

const messageBox = useMessage();

const name = ref();

const router = useRouter();

const socket = io('http://192.168.1.2:4000');

socket.emit('joinRoom', 'players');

socket.on("message", (message: string) => {
    messageBox.info(message);
});

socket.on("nameRegistered", (message: string) => {
    messageBox.success(message);
    router.push('game');
});

socket.on("nameNotRegistered", (message: string) => {
    messageBox.error(message);
});

const saveName = () => {

    socket.emit('saveName', name.value);
};
</script>

<template>
    <div class="name-view-wrapper">
        <div class="name-box">
            <h1>Podaj nick</h1>
            <n-input v-model:value="name" type="text" size="large" placeholder="nick her"
                class="name-input" :bordered="false"></n-input>
            <n-button color="#020738" size="large" class="save-button"
                @click="saveName">Zapisz</n-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.name-view-wrapper {
    overflow: hidden;
    color: white;
    background-color: #111B52;
    height: 100svh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .name-box {
        background-color: #111B52;
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

            &[type="search"]::-webkit-search-decoration,
            &[type="search"]::-webkit-search-cancel-button,
            &[type="search"]::-webkit-search-results-button,
            &[type="search"]::-webkit-search-results-decoration {
                appearance: none;
                -webkit-appearance: none;
            }


            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
                -webkit-text-fill-color: white;
                background-color: #111B52 !important;
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
                background-color: #111B52 !important;
            }

            &:focus {
                background-color: #111B52;
            }
        }
    }
}
</style>
