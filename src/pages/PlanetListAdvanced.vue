<script setup lang="ts">
import { onMounted, ref } from "vue";
import ScopedSlotCard from "../components/ScopedSlotCard.vue";
import type { Planet } from "../types/planet.type";

const planets = ref<Planet[]>([]);

const fetchPlanets = (url: string) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      planets.value = data.results;
    });
};

onMounted(() => {
  fetchPlanets("https://swapi.dev/api/planets");
});
</script>

<template>
  <div>
    <h1>Planet List Advanced</h1>
    <ScopedSlotCard
      v-for="planet in planets"
      :key="planet.name"
      :planet="planet"
    >
      <template #title="{ namePlanet }"> name : {{ namePlanet }} </template>
      <template #description>
        <p>climate : {{ planet.climate }}</p>
        <p>terrain : {{ planet.terrain }}</p>
      </template>
    </ScopedSlotCard>
  </div>
</template>
