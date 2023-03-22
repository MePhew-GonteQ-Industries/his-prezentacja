<script lang="ts">
export enum EmbedMode {
  PAGE = 1,
  YT,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  mode?: EmbedMode
  address?: string
  ytVideoId?: string
  ytVideoStart?: number
}

const props = withDefaults(defineProps<Props>(), {
  mode: () => EmbedMode.PAGE
});

const ytIframeSrc = computed(() => {
  if (!props.ytVideoStart) {
    return `https://www.youtube.com/embed/${props.ytVideoId}`;
  }

  return `https://www.youtube.com/embed/${props.ytVideoId}?start=${props.ytVideoStart}`;
})

const ytVideoAddress = computed(() => {
  if (!props.ytVideoStart) {
    return `https://www.youtube.com/watch?v=${props.ytVideoId}`;
  }

  return `https://www.youtube.com/watch?v=${props.ytVideoId}&t=${props.ytVideoStart}`;
});
</script>


<template>
  <div class="embed-container slide">
    <template v-if="mode === EmbedMode.PAGE">
      <iframe :src="address" frameborder="0" />
      <a :href="address" target="_blank">{{ address }}</a>
    </template>

    <template v-else-if="mode === EmbedMode.YT">
      <iframe :src='ytIframeSrc' title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen />
      <a :href="ytVideoAddress" target="_blank">{{ ytVideoAddress }}</a>
    </template>

  </div>
</template>

<style scoped lang="scss">
.embed-container {
  display: flex;
  flex-direction: column;

  iframe {
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    border: 1px solid #585D7C;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
    margin-top: .5rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
