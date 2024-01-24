<script setup>
import { onMounted, ref, inject } from 'vue';
import { getAvialableSlotsForCity, getVideoData } from '../api/api';

const showError = inject('showError'); // use inject to get the showError function from App.vue
const props = defineProps({
    query: {
        type: String,
        required: true
    }
});
const availableSlots = ref();
const keys = ref([]);       // keys of availableSlots
const slots = ref([]);      // selected slots
const date = ref('');       // selected date
const hour = ref('');       // selected hour
const image_urls = ref([])  // video data for selected date and hour
const active_image = ref(0) // index of active image
const plot_urls = ref([])   // plot data for selected date and hour  

// update the active image every 2 sec
setInterval(() => {
    if (image_urls.value.length > 0) {
        active_image.value = (active_image.value + 1) % image_urls.value.length;
    }
}, 2000);

const fetchSlots = async () => {
    try {
        const slots = await getAvialableSlotsForCity(props.query);
        if (slots.length === 0) throw new Error('No slots found');
        availableSlots.value = slots;
        keys.value = Object.keys(slots);
    } catch (error) {
        showError("Error fetching slots: " + error.message);
    }
}
const select = (key) => {
    date.value = key;
    slots.value = availableSlots.value[key];
    hour.value = '';
}
const fetchData = async (query, date, hour) => {
    try {
        const video = await getVideoData(query, date, hour);
        image_urls.value = video.images;
        plot_urls.value = video.plots;
    } catch (error) {
        showError("Error fetching video data: " + error.message);
    }
}

onMounted(() => {
    fetchSlots();
});
</script>

<template>
    <div class="container justify-content-center align-items-center">
        <div>
            <h1><router-link to="/">The Weather Archive</router-link></h1>
            <h2><b>{{ query }}</b></h2>
            <h3>d: <b>{{ date ? date : 'not selected' }}</b></h3>
            <h3>h: <b>{{ hour ? hour : 'not selected' }}</b></h3>
        </div>
            <div class="d-flex">
                <div class="btn-group me-2">
                    <button class="btn btn-light border btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Date
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="key in keys" :key="key">
                            <a class="dropdown-item" href="#" v-on:click="select(key)">{{ key }}</a>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn btn-light border btn-sm dropdown-toggle me-2" v-bind:class="{'disabled': !date}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Hour
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="slot in slots" :key="slot">
                            <a class="dropdown-item" href="#" v-on:click="hour=slot;">{{ slot }}</a>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-primary btn-sm" v-bind:class="{'disabled': !(date && hour)}" v-on:click="fetchData(query,date,hour)">show</button>
            </div>
            <div id="carouselExampleControls" class="carousel slide mt-3" v-bind:class="{'d-none': image_urls.length === 0}" data-bs-ride="carousel">
                <img :src="image_urls[active_image]" class="d-block w-100" alt="...">
            </div>

            <div id="carouselExampleControls" class="carousel slide mt-3" v-bind:class="{'d-none': plot_urls.length === 0}" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item border active">
                        <img :src="plot_urls[0]" class="" alt="...">
                    </div>
                    <div class="carousel-item border" v-for="(url, index) in plot_urls.slice(1)" :key="index">
                        <img :src="url" class="" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.carousel {
    height: 350px;
    /* Set a fixed height for the carousel items */
    width: 500px;
    max-width: 500px;
    max-height: 350px;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-color: gray;
}
</style>