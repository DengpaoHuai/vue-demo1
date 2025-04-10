<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useMovieStore } from "../store/useMovieStore";
import { storeToRefs } from "pinia";
import { Column, DataTable } from "primevue";

const { movies } = storeToRefs(useMovieStore());
const { deleteItem } = useMovieStore();
</script>

<template>
  <div id="container">
    <h1>List Movies</h1>
    <RouterLink :to="{ name: 'CreateMovie' }">Create Movie</RouterLink>
    <DataTable
      resizableColumns
      columnResizeMode="fit"
      showGridlines
      :value="movies"
      tableStyle="min-width: 50rem"
    >
      <Column field="title" sortable header="Code"></Column>
      <Column field="director" sortable header="Name"></Column>
      <Column field="notation" sortable header="Category"></Column>
      <Column field="_id" header="Quantity"></Column>
    </DataTable>
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        {{ movie.title }}
        <button @click="deleteItem(movie._id)">supprimer</button>
        <RouterLink
          :to="{ name: 'DisplayMovie', params: { identifiant: movie._id } }"
        >
          <button>afficher</button>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
