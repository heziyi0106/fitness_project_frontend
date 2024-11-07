import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import AboutPage from '@/components/About.vue';
import ExerciseDashboard from '@/components/ExerciseApp/ExerciseDashboard.vue';
import LoginPage from '@/components/AccountsApp/LoginPage.vue';
import RegisterPage from '@/components/AccountsApp/RegisterPage.vue';
import LogoutPage from '@/components/AccountsApp/LogoutPage.vue';
import WorkoutJournalEditor from '@/components/WorkoutJournalApp/WorkoutJournalEditor.vue';

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
    {
        path: '/logout',
        name: 'LogoutPage',
        component: LogoutPage
    },
    {
        path: '/editor',
        name: 'WorkoutJournalEditor',
        component: WorkoutJournalEditor
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
