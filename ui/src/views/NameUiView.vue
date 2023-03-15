<script setup lang="ts">
import { ref } from 'vue';
import { NInput, NButton } from 'naive-ui';
import { io } from 'socket.io-client';

const name = ref();

const socket = io('http://localhost:4000');

socket.emit('joinRoom', 'players');

socket.on("message", (message) => {
    console.log(message);
});

const saveName = () => {

    socket.emit('saveName', name.value);
};
</script>

<template>
    <div class="name-view-wrapper">
        <div class="name-box">
            <h1>Podaj swoje imię</h1>
            <n-input v-model:value="name" type="text" size="large" placeholder="Podaj imię" class="name-input"
                :bordered="false"></n-input>
            <n-button color="#020738" size="large" class="save-button" @click="saveName">Zapisz</n-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.name-view-wrapper {
    overflow: hidden;
    color: white;
    background-color: #020738;
    height: 100svh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .name-box {
        background-color: #111B52;
        width: 80%;
        height: 60%;
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