import { useAuthStore } from "src/stores/auth";

export function loginRequired({ next }) {
  const store = useAuthStore();
  if (store.isAuthenticated) {
    return next();
  } else {
    return next("/signin");
  }
}
