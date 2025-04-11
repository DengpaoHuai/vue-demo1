import { createRouter, createWebHistory } from "vue-router";
import PlanetList from "../pages/PlanetList.vue";
import Login from "../pages/Login.vue";
import movieRouter from "./movie-router";
import PlanetListAdvanced from "../pages/PlanetListAdvanced.vue";
import PlanetListComposable from "../pages/PlanetListComposable.vue";
const routes = [
  { path: "/", component: PlanetList, meta: { layout: "LogoutLayout" } },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "DefaultLayout" },
  },
  movieRouter,
  {
    path: "/planet-list-advanced",
    name: "PlanetListAdvanced",
    component: PlanetListAdvanced,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/planet-list-composable",
    name: "PlanetListComposable",
    component: PlanetListComposable,
    meta: { layout: "DefaultLayout" },
  },
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
