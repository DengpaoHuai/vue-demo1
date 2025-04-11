<script setup lang="ts">
import type { Planet } from "../types/planet.type";

defineProps<{
  planet: Planet;
}>();
</script>

<template>
  <div>
    <h1>Scoped Slot Card</h1>
    <slot name="title" v-if="planet.name" :namePlanet="planet.name"></slot>
    <slot name="description"></slot>
    <slot name="image"></slot>
  </div>
</template>

<style scoped></style>
