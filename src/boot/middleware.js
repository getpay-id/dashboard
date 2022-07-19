import { boot } from "quasar/wrappers";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
/**
 * A stack of different middlewares ran in series
 * Link: https://blog.logrocket.com/vue-middleware-pipelines/
 */
function middlewarePipeline(context, middlewares, index) {
  let middleware = middlewares[index];
  if (!middleware) return context.next;
  return () => {
    let nextMiddleware = middlewarePipeline(context, middlewares, index + 1);
    middleware({ ...context, next: nextMiddleware });
  };
}

export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (!to.meta.middlewares) return next();
    let middlewares = to.meta.middlewares;
    let context = { to, from, next };
    return middlewares[0]({
      ...context,
      next: middlewarePipeline(context, middlewares, 1),
    });
  });
});
