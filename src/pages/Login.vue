<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);
</script>

<template>
  <div>
    <h1>Login</h1>
    <p>{{ counter }}</p>
    <button @click="counter++">increment</button>
  </div>
</template>
