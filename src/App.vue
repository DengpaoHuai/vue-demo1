<script setup lang="ts">
import { reactive, ref } from "vue";
import PlanetList from "./components/PlanetList.vue";

let demoArray = ref([
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
  { id: 3, title: "Task 3" },
]);

const count = ref(0);

const handleClick = () => {
  count.value++;
  console.log(count);
  console.log(count.value);
};

const person = reactive({
  name: "John",
  age: 30,
});

const incrementAge = () => {
  person.age++;
  console.log(person);
};

const addTask = (task: string) => {
  let newTask = { id: 4, title: task };
  demoArray.value.push(newTask);
};
</script>

<template>
  <PlanetList></PlanetList>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
