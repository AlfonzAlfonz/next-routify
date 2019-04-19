import { bundle, simple, route, router } from "../dist/";

export const { routes, flattenRoutes } = router(
  bundle(simple("", ""), {
    article: route<{ id: number }>("article/:id", "article"),
    user: simple("user"),
    admin: bundle(simple("admin", "admin"), {
      dashboard: simple("dashboard", ""),
      article: route<{ id: number }>("article/:id", "article"),
      user: simple("user", "user")
    })
    // category: bundle(route<{ id: number }>("category/:id", "category"), {
    //   article: route<{ id: number }>("article/:id", "article"),
    //   user: simple("user", "user")
    // })
  })
);
