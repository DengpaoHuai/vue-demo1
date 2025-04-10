import type { Movie } from "../types/movie.type";

const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const API_KEY = "5e0a68aefcdc49f0adc0358b1814da07";

const API_URL = `https://crudcrud.com/api/${API_KEY}/movies`;

export const createMovie = async (movieForm: Omit<Movie, "_id">) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(movieForm),
    headers: {
      "content-type": "application/json",
    },
  });
  const results = await response.json();
  return results;
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
  const response = await fetch(API_URL);
  const results = await response.json();
  return results;
};

export const deleteMovie = async (id: string) => {
  /*await waitFor(2000);
  throw new Error("error");*/

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response;
};
