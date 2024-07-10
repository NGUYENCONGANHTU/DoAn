import { createRouter, createWebHistory } from "vue-router";
import { authenticatorLogin } from "@/middleware/middleware";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    beforeEnter: authenticatorLogin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/:catchAll(.*)",
        component: () => import("@/components/404.vue"),
      },
      {
        path: "/banner",
        component: () => import("@/views/banner/index.vue"),
      },
      {
        path: "/category",
        component: () => import("@/views/category/index.vue"),
      },
      {
        path: "/trademark",
        component: () => import("@/views/trademark/index.vue"),
      },
      {
        path: "/contact",
        component: () => import("@/views/contact/index.vue"),
      },
      {
        path: "/user",
        component: () => import("@/views/user/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
