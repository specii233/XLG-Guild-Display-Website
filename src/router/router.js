import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Map from '../views/Map.vue';

const routes = [
    { 
        path: '/',
        name: 'Home',
        component: Home
    },
    { 
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/map',
        name: 'Map',
        component: Map
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;