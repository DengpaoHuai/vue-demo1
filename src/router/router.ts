import { createRouter, createWebHistory } from "vue-router";
import PlanetList from "../components/PlanetList.vue";
import CreateMovie from "../components/CreateMovie.vue";

const routes = [
  { path: "/", component: PlanetList },
  { path: "/create-movie", component: CreateMovie },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
