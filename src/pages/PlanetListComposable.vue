<script setup lang="ts">
import { watch } from "vue";
import useFetch, { url as url1 } from "../composables/useFetch";
import type { PlanetResponse } from "../types/planet.type";

const {
  data: planets,
  error,
  loading,
} = useFetch<PlanetResponse>("https://swapi.dev/api/planets/");

watch(
  planets,
  () => {
    console.log(planets.value);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <h1>Planet List</h1>
    <p v-if="loading">chargement...</p>
    <ul>
      <li v-for="planet in planets?.results" :key="planet.name">
        {{ planet.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
