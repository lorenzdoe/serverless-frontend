<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue';

const showError = inject('showError'); // use inject to get the showError function from App.vue

const searchOptions = ['Wien', 'Berlin', 'Paris'] // Replace with your autocomplete options
const searchInput = ref('') // Initialize searchInput as a reactive reference
const router = useRouter() // Get the router instance


const search = () => {
    // first check if searchInput is in searchOptions
    if (!searchOptions.includes(searchInput.value)) {
        showError('\'' + searchInput.value + '\' is not a valid search option')
        return
    }
    // Navigate to a new route and pass the searchInput as a parameter
    router.push({ name: 'SearchResult', params: { query: searchInput.value } })
}

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