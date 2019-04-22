import { route, simple, bundle, router, empty, filesystem } from "../dist";

const { routes, flattenRoutes } = router(
  bundle(simple(""), {
    article: route<{ id: number }>("article/:id"),
    user: simple("user"),
    admin: bundle(simple("admin"), {
      dashboard: simple("dashboard", ""),
      article: route<{ id: number }>("article/:id"),
      user: simple("user")
    }),
    store: bundle(empty("store"), {
      tshirts: simple("tshirts"),
      misc: simple("misc")
    }),
    dev: filesystem("dev")
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

routes()
  .store()
  .misc().url;

routes()
  .store()
  .tshirts();
