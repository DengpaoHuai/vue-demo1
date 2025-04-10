import httpClient from "../lib/http-client";
import type { Movie } from "../types/movie.type";

export const createMovie = async (movieForm: Omit<Movie, "_id">) => {
  const response = await httpClient.post("/", movieForm);
  return response.data;
};

/*
const createMoviePromise = (movieForm: Omit<Movie, "_id">) => {
  return new Promise((resolve, reject) => {
    fetch("https://crudcrud.com/api/e5ab5afcc48949b7908d87c6280dd39d/movies", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};*/

export const getMovies = async () => {
  // await waitFor(2000);
  const response = await httpClient.get("/");
  return response.data;
};

export const deleteMovie = async (id: string) => {
  /*await waitFor(2000);
  throw new Error("error");*/

  const response = await httpClient.delete(`/${id}`);
  return response;
};

export const getMovieById = async (id: string) => {
  const response = await httpClient.get(`/${id}`);
  return response.data;
};
