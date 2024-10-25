import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import AboutPage from '@/components/About.vue';
import ExercisePage from '@/components/ExerciseApp/Exercise.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    },
    {
        path: '/exercise',
        name: 'Exercise',
        component: ExercisePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
