<script setup lang="ts">
import { InputNumber } from "primevue";

const model = defineModel<number>({ required: true });
/*
defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});*/

defineProps<{
  label: string;
  name: string;
  id: string;
}>();
</script>

<template>
  <div class="input-text">
    <label :for="id">{{ label }}</label>
    <InputNumber :name="name" :id="id" v-model="model" />
  </div>
</template>

<style scoped>
.input-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
