import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../modules/dashboard/Dashboard.vue";
import Application from "../modules/application/Application.vue";
import Profile from "../modules/profile/Profile.vue";

const routes = [
    { path: "/", name: "Dashboard", component: Dashboard },
    { path: "/application/:id", name: "Application", component: Application, props: true },
    { path: "/profile", name: "Profile", component: Profile, props: true },
    { path: "/:pathMatch(.*)*", redirect: "/" } // fallback route
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
