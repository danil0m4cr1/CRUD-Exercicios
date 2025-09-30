import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Maquinas from "../views/Maquinas.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/users", name: "users", component: Users },
  { path: "/maquinas", name: "maquinas", component: Maquinas }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

