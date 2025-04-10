import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import type { Movie } from "../types/movie.type";
import { createMovie, getMovies } from "../services/movie.service";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<Movie[]>([]);

  const setAllMovies = (moviesList: Movie[]) => {
    movies.value = moviesList;
  };

  const getData = () => {
    getMovies().then((data) => {
      movies.value = data;
    });
  };

  const addMovie = async (movieForm: Omit<Movie, "_id">) => {
    const data = await createMovie(movieForm);
    movies.value.push(data);
  };

  onMounted(() => {
    getData();
  });

  return {
    setAllMovies,
    movies,
    addMovie,
  };
});
