import { store } from "quasar/wrappers";
import { createPinia } from "pinia";
import { useAuthStore } from "./auth";
import { usePaymentStore } from "./payment";
import { useApiKeyStore } from "./apikey";
import { useMediaStore } from "./media";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();
  useAuthStore(pinia);
  usePaymentStore(pinia);
  useApiKeyStore(pinia);
  useMediaStore(pinia);
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia;
});
