import CreateMovie from "../pages/CreateMovie.vue";
import DisplayMovie from "../pages/DisplayMovie.vue";
import ListMovies from "../pages/ListMovies.vue";

const movieRouter = {
  path: "/movies",
  children: [
    { path: "create", name: "CreateMovie", component: CreateMovie },
    {
      path: "",
      name: "ListMovies",
      component: ListMovies,
      /* beforeEnter: async () => {
          const movies = await useMovieStore().getData();
          console.log(movies);
          if (movies.length > 1) return false;
          return true;
        },*/
    },
    {
      path: ":identifiant",
      name: "DisplayMovie",
      component: DisplayMovie,
    },
  ],
};

export default movieRouter;
