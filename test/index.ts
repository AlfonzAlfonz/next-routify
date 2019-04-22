import { bundle, simple, route, router, empty, filesystem } from "../dist/";

export const { routes, flattenRoutes } = router(
  bundle(simple("", ""), {
    article: route<{ id: number }>("article/:id", "article"),
    user: simple("user"),
    admin: bundle(simple("admin", "admin"), {
      dashboard: simple("dashboard", ""),
      article: route<{ id: number }>("article/:id", "article"),
      user: simple("user", "user")
    }),
    store: bundle(empty("store"), {
      tshirts: simple("tshirts"),
      misc: simple("misc")
    }),
    dev: filesystem("dev")
    // category: bundle(route<{ id: number }>("category/:id", "category"), {
    //   article: route<{ id: number }>("article/:id", "article"),
    //   user: simple("user", "user")
    // })
  })
);
