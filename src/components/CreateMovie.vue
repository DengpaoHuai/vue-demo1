<script setup lang="ts">
import { reactive } from "vue";

const movieForm = reactive({
  title: "",
  director: "",
  notation: 0,
});

const onSubmit = () => {
  console.log("soumission");
  console.log(movieForm);

  fetch("https://crudcrud.com/api/c2fcb1937b60447092074f34d0bdf5ca/movies", {
    method: "POST",
    body: JSON.stringify(movieForm),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
</script>

<template>
  <div id="container">
    <h1>Create Movie</h1>

    <form @submit.prevent="onSubmit">
      <input type="text" name="title" v-model="movieForm.title" />
      <input type="text" name="director" v-model="movieForm.director" />
      <input type="number" name="notation" v-model="movieForm.notation" />
      <button>submit</button>
    </form>
  </div>
</template>

<style scoped>
#container {
  height: 500vh;
}
</style>
