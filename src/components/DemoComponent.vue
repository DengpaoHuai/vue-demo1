<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        default: 'Hello World'
    }
})


console.log(props)

</script>

<template>
    <div>
        <h1>
            {{ title }}
        </h1>
    </div>
</template>