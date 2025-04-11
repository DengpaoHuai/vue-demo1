<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
//:is="route.meta.layout ? route.meta.layout : 'DefaultLayout'"
</script>

<template>
  <component :is="route.meta.layout ?? 'DefaultLayout'">
    <RouterView></RouterView>
  </component>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
