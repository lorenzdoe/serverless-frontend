<script setup>
const heading = 'Video View';

const props = defineProps({
    query: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div>
            <h1>{{ heading }}</h1>
            <h2>Ready to call api for: {{ query }}</h2>
            <router-link to="/">Back to search</router-link>
        </div>
    </div>
</template>

<style>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>