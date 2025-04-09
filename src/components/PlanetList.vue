<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { PlanetResponse } from "../types/planet.type";

const planets = reactive<PlanetResponse>({
  count: 0,
  next: null,
  previous: null,
  results: [],
});
const loading = ref(false);

const fetchPlanets =  (url : string) => {
  loading.value = true;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      planets.results = data.results;
      planets.count = data.count;
      planets.next = data.next;
      planets.previous = data.previous;
      loading.value = false;
    });
};

onMounted(() => {
  fetchPlanets("https://swapi.dev/api/planets");
});

</script>

<template>
  <h1>Planets</h1>
  <div v-if="loading">
    <p>loading....</p>
  </div>
  <div v-for="planet in planets.results">
    <p>
      {{ planet.name }}
    </p>
  </div>
  <button 
  :disabled="!planets.previous"
  @click="fetchPlanets(planets.previous!)">précédent</button>
  <button 
  :disabled="!planets.next"
  @click="fetchPlanets(planets.next!)">suivant</button>
</template>
