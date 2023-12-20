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
    <div class="container justify-content-center align-items-center">
        <div>
            <h1>{{ heading }}</h1>
            <h2>Ready to call api for: {{ query }}</h2>
            <router-link to="/">Back to search</router-link>
        </div>
        <div class="mt-3">
            <div class="mb-3">
                <img class="border border-black" src="https://via.placeholder.com/600x300" alt="Placeholder Image 1">
            </div>
            <div>
                <img class="border border-black" src="https://via.placeholder.com/600x300" alt="Placeholder Image 2">
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>