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
import hljs from 'highlight.js/lib/core';

const messagePlacement = ref<MessageProviderProps["placement"]>("top");
</script>

<template>
  <n-config-provider :theme="darkTheme" :hljs="hljs">
    <n-loading-bar-provider>
      <n-message-provider :placement="messagePlacement" :max="1">
        <RouterView />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
