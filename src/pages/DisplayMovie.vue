<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { Movie } from "../types/movie.type";
import { getMovieById } from "../services/movie.service";

const route = useRoute();
const movieId = route.params.identifiant;

const movie = ref<Movie>();

console.log(movieId);

onMounted(() => {
  getMovieById(movieId as string).then((data) => {
    movie.value = data;
  });
});
</script>

<template>
  <div>
    <h1>DisplayMovie</h1>
    <h2>{{ movie && movie.title }}</h2>
    <p>{{ movie ? movie.notation : "" }}</p>
    <p>{{ movie?.director }}</p>
  </div>
</template>
