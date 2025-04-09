<script setup>
import { ref } from 'vue';

const tasks = ref([
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },
])

const addTask = () => {
    tasks.value.push({ id: 4, title: 'Task 4' })
}
</script>

<template>
    <div>
        <h1>Task List</h1>

        <ul>
            <li v-for="task in tasks" :key="task.id">
                {{ task.title }}
            </li>
        </ul>

        <button @click="addTask">Add Task</button>
    </div>
</template>