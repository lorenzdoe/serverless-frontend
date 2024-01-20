<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue';
import { getCities } from '../api/api';

const router = useRouter() // Get the router instance
const showError = inject('showError'); // use inject to get the showError function from App.vue

const searchOptions = ref([]) // Initialize searchOptions as a reactive reference
const searchInput = ref('') // Initialize searchInput as a reactive reference

const fetchCities = async () => {
    try {
        const cities = await getCities() // Call the getCities function from api.js
        if (cities.length === 0) throw new Error('No cities found') // Throw an error if getCities returns an empty array
        searchOptions.value = cities // Set searchOptions to the cities array
    } catch (error) {
        showError("Error fetching cities: " + error.message) // Show error message if getCities fails
    }
}

const search = () => {
    // first check if searchInput is in searchOptions
    if (!searchOptions || !searchOptions.value.includes(searchInput.value)) {
        showError('\'' + searchInput.value + '\' is not a valid search option')
        return
    }
    // Navigate to a new route and pass the searchInput as a parameter
    router.push({ name: 'SearchResult', params: { query: searchInput.value } })
}

// TODO: add store to save cities and not fetch them every time
onMounted(() => {
    fetchCities();
});
</script>
<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div>
            <h1>The Weather Archive</h1>
            <div class="d-flex justify-content-center align-items-center">
                <input
                type="text"
                class="form-control"
                placeholder="Search"
                autocomplete="off"
                list="autocompleteOptions"
                v-model="searchInput"
                />
                <datalist id="autocompleteOptions">
                    <option v-for="option in searchOptions" :value="option" :key="option" />
                </datalist>
                <button class="btn btn-primary" @click="search">Search</button> <!-- Trigger search function on click -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>