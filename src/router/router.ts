import { createRouter, createWebHistory } from "vue-router";
import PlanetList from "../pages/PlanetList.vue";
import Login from "../pages/Login.vue";
import movieRouter from "./movie-router";

const routes = [
  { path: "/", component: PlanetList },
  { path: "/login", name: "Login", component: Login },
  movieRouter,
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

/*
router.beforeEach(async (to, from) => {
  if (to.name === "Login") return true;
  const token = localStorage.getItem("token");
  if (!token) {
    // redirect the user to the login page
    return { name: "Login" };
  }
});*/
