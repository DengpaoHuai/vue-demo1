<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Movie } from "../types/movie.type";
import { RouterLink } from "vue-router";
import { deleteMovie, getMovies } from "../services/movie.service";

const movies = ref<Movie[]>([]);

const getData = () => {
  getMovies().then((data) => {
    movies.value = data;
  });
};

onMounted(() => {
  getData();
});

const deleteItem = async (id: string) => {
  await deleteMovie(id);
  // getData();
  /*movies.value = movies.value.filter((movie) => {
    if (movie._id === id) return false;
    return true;
  });*/

  movies.value = movies.value.filter((movie) => movie._id !== id);
};
</script>

<template>
  <div id="container">
    <h1>List Movies</h1>
    <RouterLink to="/create-movie">Create Movie</RouterLink>
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        {{ movie.title }}
        <button @click="deleteItem(movie._id)">supprimer</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
