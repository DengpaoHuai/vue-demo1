<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useMovieStore } from "../store/useMovieStore";
import { storeToRefs } from "pinia";

const { movies } = storeToRefs(useMovieStore());
const { deleteItem } = useMovieStore();
</script>

<template>
  <div id="container">
    <h1>List Movies</h1>
    <RouterLink :to="{ name: 'CreateMovie' }">Create Movie</RouterLink>
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        {{ movie.title }}
        <button @click="deleteItem(movie._id)">supprimer</button>
        <RouterLink :to="{ name: 'DisplayMovie', params: { identifiant: movie._id } }">
          <button>afficher</button>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
