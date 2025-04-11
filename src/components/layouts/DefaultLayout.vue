<script lang="ts" setup></script>

<template>
  <header>
    <h1>Header</h1>
  </header>
  <slot></slot>
  <footer>
    <h1>Footer</h1>
  </footer>
</template>

<style scoped>
header {
  background-color: #f0f0f0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

footer {
  background-color: #f0f0f0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
