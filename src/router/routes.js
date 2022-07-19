import { loginRequired } from "src/middlewares/auth";

const routes = [
  {
    path: "/",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
    meta: {
      middlewares: [loginRequired],
    },
  },
  {
    path: "/payment",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "gateway",
        name: "paymentGateway",
        component: () => import("pages/PaymentGateway/Index.vue"),
      },
      {
        path: "method/:id",
        name: "paymentMethod",
        component: () => import("pages/PaymentMethod/Index.vue"),
      },
    ],
    meta: {
      middlewares: [loginRequired],
    },
  },
  {
    path: "/signin",
    component: () => import("layouts/BlankLayout.vue"),
    children: [{ path: "", component: () => import("pages/Auth/SignIn.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
