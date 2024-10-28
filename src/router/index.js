import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import AboutPage from '@/components/About.vue';
import ExerciseDashboard from '@/components/ExerciseApp/ExerciseDashboard.vue';
import CalendarTest from '@/components/ExerciseApp/CalendarView.vue';

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
        path: '/exercises',
        name: 'ExerciseDashboard',
        component: ExerciseDashboard
    },
    {
        path: '/calendar',
        name: 'CalendarTest',
        component: CalendarTest
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
