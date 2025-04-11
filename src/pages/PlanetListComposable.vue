<script setup lang="ts">
import { ref, watch } from "vue";
import useFetch, { url as url1 } from "../composables/useFetch";
import type { PlanetResponse } from "../types/planet.type";

const url = ref<string>("https://swapi.dev/api/planets/");

console.log(url);
console.log(url.value);
const { data: planets, error, loading } = useFetch<PlanetResponse>(url);

const goToPreviousPage = () => {
  if (planets.value?.previous) url.value = planets.value?.previous;
};

const goToNextPage = () => {
  if (planets.value?.next) url.value = planets.value?.next;
};
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
  <button @click="goToPreviousPage">précédent</button>
  <button @click="goToNextPage">suivant</button>
</template>

<style scoped></style>
