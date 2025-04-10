<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Movie } from '../types/movie.type';
import { RouterLink } from 'vue-router';
import { getMovies } from '../services/movie.service';

const movies = ref<Movie[]>([]);

onMounted(() => {
    getMovies().then((data) => {
        movies.value = data;
    });
});


</script>

<template>
  <div id="container">
    <h1>List Movies</h1>
    <RouterLink to="/create-movie">Create Movie</RouterLink>
    <ul>
        <li v-for="movie in movies" :key="movie._id">
            {{ movie.title }}
        </li>
    </ul>
  </div>
</template>

<style scoped>

</style>