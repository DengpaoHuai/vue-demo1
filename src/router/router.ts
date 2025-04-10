import { createRouter, createWebHistory } from "vue-router";
import PlanetList from "../pages/PlanetList.vue";
import CreateMovie from "../pages/CreateMovie.vue";
import ListMovies from "../pages/ListMovies.vue";
const routes = [
  { path: "/", component: PlanetList },
  { path: "/create-movie", component: CreateMovie },
  { path: "/list-movies", component: ListMovies },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
