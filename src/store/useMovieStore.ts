import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import type { Movie } from "../types/movie.type";
import { createMovie, deleteMovie, getMovies } from "../services/movie.service";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<Movie[]>([]);

  const setAllMovies = (moviesList: Movie[]) => {
    movies.value = moviesList;
  };

  const getData = async () => {
    const data = await getMovies();
    movies.value = data;
    return data;
  };

  const addMovie = async (movieForm: Omit<Movie, "_id">) => {
    const data = await createMovie(movieForm);
    movies.value.push(data);
  };

  const deleteItem = async (id: string) => {
    await deleteMovie(id);
    // getData();
    /*movies.value = movies.value.filter((movie) => {
      if (movie._id === id) return false;
      return true;
    });*/

    movies.value = movies.value.filter((movie) => movie._id !== id);
  };

  onMounted(() => {
    getData();
  });

  return {
    setAllMovies,
    movies,
    getData,
    addMovie,
    deleteItem,
  };
});
