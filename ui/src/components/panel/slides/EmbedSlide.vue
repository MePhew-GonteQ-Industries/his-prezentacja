<script setup lang="ts">
defineProps({
  address: String,
  mode: {
    type: String,
    default: 'page',
  },
})
</script>


<template>
  <div class="embed-container slide">
    <iframe :src="address" frameborder="0" v-if="mode === 'page'"></iframe>
    <iframe v-else-if="mode === 'yt'" :src='address' title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
    <a :href="address" target="_blank">{{ address }}</a>
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
