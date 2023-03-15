<script setup lang="ts">
import { ref } from 'vue';
import { NInput } from 'naive-ui';

const name = ref();
</script>

<template>
    <div class="name-view-wrapper">
        <div class="name-box">
            <n-input v-model:value="name" type="text" placeholder="Podaj imię"></n-input>
        </div>
    </div>
</template>

<style scoped lang="scss">
.name-view-wrapper {
    background-color: #020738;
    height: 100vh;
    width: 100vw;

    .name-box {
        background-color: #111B52;
        width: 80%;
        height: 60%;
        border: 1px solid white;
    }
}
</style>