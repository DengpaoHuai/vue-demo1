<script setup lang="ts">
import { onMounted, ref } from "vue";

type Planet = {
  name: string;
  population: string;
  orbital_period: string;
};

const planets = ref<Planet[]>([]);
const loading = ref(false);

//never

onMounted(() => {
  loading.value = true;
  fetch("https://swapi.dev/api/planets")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      planets.value = data.results;
      loading.value = false;
    });
});
</script>

<template>
  <h1>Planets</h1>
  <div v-if="loading">
    <p>loading....</p>
  </div>
  <div v-for="planet in planets">
    <p>
      {{ planet.name }}
    </p>
  </div>
</template>
