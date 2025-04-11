<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="planet-card">
    <h1>
      {{ name }}
    </h1>
    <slot></slot>
    <div class="action-buttons">
      <slot name="action-buttons"></slot>
    </div>
  </div>
</template>

<style scoped>
.planet-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

p {
  font-size: 16px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 10px;
}
</style>
