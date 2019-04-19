import { route, simple, bundle, router } from "../dist";

const { routes, flattenRoutes } = router(
  bundle(simple(""), {
    article: route<{ id: number }>("article/:id"),
    user: simple("user"),
    admin: bundle(simple("admin"), {
      dashboard: simple("dashboard", ""),
      article: route<{ id: number }>("article/:id"),
      user: simple("user")
    })
  })
);

// /
routes().url;

// /article/5
routes().article({ id: 5 }).url;

// /user
routes().user().url;

// /admin
routes().admin().url;

// /admin/article/5
routes()
  .admin()
  .article({ id: 5 }).url;

// /admin/user
routes()
  .admin()
  .user().url;
