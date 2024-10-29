import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import AboutPage from '@/components/About.vue';
import ExerciseDashboard from '@/components/ExerciseApp/ExerciseDashboard.vue';
import LoginPage from '@/components/AccountsApp/LoginPage.vue';
import RegisterPage from '@/components/AccountsApp/RegisterPage.vue';
// import CalendarTest from '@/components/ExerciseApp/CalendarView.vue';

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
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },
    // {
    //     path: '/calendar',
    //     name: 'CalendarTest',
    //     component: CalendarTest
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
