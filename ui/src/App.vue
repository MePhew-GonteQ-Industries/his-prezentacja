<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import {
  darkTheme,
  NConfigProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from "naive-ui";
import type { MessageProviderProps } from "naive-ui";

const messagePlacement = ref<MessageProviderProps["placement"]>("bottom");
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-message-provider :placement="messagePlacement">
        <RouterView />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
