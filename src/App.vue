<script setup lang="ts">
import { reactive, ref } from 'vue';
import DemoComponent from './components/DemoComponent.vue';

let title = 'Mon titre 2'

const count = ref(0)

const handleClick = () => {
  count.value++
  console.log(count)
  console.log(count.value)
}

const person = reactive({
  name: 'John',
  age: 30
})

const incrementAge = () => {
  person.age++
  console.log(person)
}

</script>

<template>
    <div>
      <DemoComponent :title="title" />
      <p>{{ count }}</p>
      <button @click="handleClick">Click me</button>
      <p>{{ person.age }}</p>
      <button @click="incrementAge">Increment age</button>
    </div>
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
