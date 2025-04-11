<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import type { PlanetResponse } from "../types/planet.type";
import StarsWarCard from "../components/StarsWarCard.vue";

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
};

type FilmResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

const planets = reactive<PlanetResponse>({
  count: 0,
  next: null,
  previous: null,
  results: [],
});
const loading = ref(false);

const films = reactive<FilmResponse>({
  count: 0,
  next: null,
  previous: null,
  results: [],
});

const fetchPlanets = (url: string) => {
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

const fetchFilms = (url: string) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      films.results = data.results;
    });
};

onMounted(() => {
  fetchPlanets("https://swapi.dev/api/planets");
  fetchFilms("https://swapi.dev/api/films");
  //addEventListener("scroll", listener);
});

onUnmounted(() => {
  console.log("je quitte la page");
  //removeEventListener("scroll", listener);
});
</script>

<template>
  <div id="container">
    <RouterLink :to="{ name: 'ListMovies' }"
      >aller sur la liste des films</RouterLink
    >
    <RouterLink :to="{ name: 'CreateMovie' }"
      >aller sur la création de film</RouterLink
    >
    <h1>Planets</h1>
    <div v-if="loading">
      <p>loading....</p>
    </div>

    <StarsWarCard v-for="planet in planets.results" :name="planet.name">
      <p class="climate">
        {{ planet.climate }}
      </p>
      <p class="terrain">
        {{ planet.terrain }}
      </p>
      <template #action-buttons>
        <Button v-if="planet.films.length > 0">Voir les films</Button>
        <Button v-if="planet.residents.length > 0">Voir les habitants</Button>
      </template>
    </StarsWarCard>

    <h2>Films</h2>
    <StarsWarCard v-for="film in films.results" :name="film.title">
      <p class="title">
        {{ film.title }}
      </p>
      <template #action-buttons>
        <Button>Voir les habitants</Button>
      </template>
    </StarsWarCard>

    <Button
      :disabled="!planets.previous"
      @click="fetchPlanets(planets.previous!)"
    >
      précédent
    </Button>
    <Button :disabled="!planets.next" @click="fetchPlanets(planets.next!)">
      suivant
    </Button>
  </div>
</template>

<style scoped lang="scss">
#container {
  height: 500vh;
}

h1 {
  color: $primary;
}

.climate,
.terrain {
  color: $secondary;
}
</style>
