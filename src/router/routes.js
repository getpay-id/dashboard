import { loginRequired } from "src/middlewares/auth";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: {
      middlewares: [loginRequired],
    },
  },
  {
    path: "/signin",
    component: () => import("layouts/BlankLayout.vue"),
    children: [{ path: "", component: () => import("pages/auth/SignIn.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
