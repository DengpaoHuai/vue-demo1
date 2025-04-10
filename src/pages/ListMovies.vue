<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { deleteMovie, getMovies } from "../services/movie.service";
import { useMovieStore } from "../store/useMovieStore";

const movieStore = useMovieStore();

const deleteItem = async (id: string) => {
  await deleteMovie(id);
  // getData();
  /*movies.value = movies.value.filter((movie) => {
    if (movie._id === id) return false;
    return true;
  });*/

  // movies.value = movies.value.filter((movie) => movie._id !== id);
};
</script>

<template>
  <div id="container">
    <h1>List Movies</h1>
    <RouterLink to="/create-movie">Create Movie</RouterLink>
    <ul>
      <li v-for="movie in movieStore.movies" :key="movie._id">
        {{ movie.title }}
        <button @click="deleteItem(movie._id)">supprimer</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
