import { createRouter, createWebHistory } from "vue-router";
import { getUserState } from "@/firebase";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/Inicio",
    name: "Inicio",
    component: () => import("@/views/Inicio.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  // open user Profile

  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { noAuth: true },
  },
  {
    path: "/auth/signup",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
    meta: { noAuth: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
    meta: { noAuth: true },
  },
  {
    path: "/RegistrarAlumno",
    name: "RegistrarAlumno",
    component: () => import("@/views/RegistrarAlumno.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Create",
    name: "Crear",
    component: () => import("@/components/Alumnos/Create.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const noAuth = to.matched.some((record) => record.meta.noAuth);

  const isAuth = await getUserState();

  if (requiresAuth && !isAuth) next({ name: "Login" });
  else if (noAuth && isAuth) next({ name: "Home" });
  else next();
});

export default router;
