import { createRouter, createWebHistory } from "vue-router";
import SearchView from "../views/SearchView.vue";
import SearchResult from "../views/SearchResult.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: "/", 
            name: "SearchView",
            component: SearchView 
        },
        { 
            path: "/search/:query", 
            name: "SearchResult",
            component: SearchResult,
            props: true
        },
    ],
});

export default router;