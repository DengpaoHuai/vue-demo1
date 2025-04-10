<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { Movie } from "../types/movie.type";
import { useMovieStore } from "../store/useMovieStore";

//composable. UNIQUEMENT à la racine d'un composant ou d'un autre composable.
const router = useRouter();

const movieStore = useMovieStore();

// Omit<Movie, "_id"> : on retire le champ _id du type Movie
//Type utilitaire typescript : on peut utiliser Omit pour retirer un champ d'un type
const movieForm = reactive<Omit<Movie, "_id">>({
  title: "",
  director: "",
  notation: 0,
});
const isSubmitting = ref(false);

const onSubmit = () => {
  isSubmitting.value = true;
  movieStore
    .addMovie(movieForm)
    .then((data) => {
      console.log(data);
      router.push("/list-movies");
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};

/*
const onSubmit = async () => {
  console.log('submit')
  try {
    const data = await createMovie(movieForm);
    console.log(data);
    router.push("/list-movies");
  } catch (error) {
    console.error(error);
  }
}*/
</script>

<template>
  <div id="container">
    <h1>Create Movie</h1>

    <form @submit.prevent="onSubmit">
      <input type="text" name="title" v-model="movieForm.title" />
      <input type="text" name="director" v-model="movieForm.director" />
      <input type="number" name="notation" v-model="movieForm.notation" />
      <button :disabled="isSubmitting">submit</button>
    </form>
    <ul>
      <li v-for="movie in movieStore.movies" :key="movie._id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
#container {
  height: 500vh;
}
</style>
