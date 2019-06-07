import {
  route,
  simple,
  bundle,
  router,
  routifyBuilder,
  filesystem
} from "../../dist";

export const { routes, flattenRoutes } = router(
  bundle(simple(""), {
    article: route<{ id: number }>("article/:id"),
    simple: simple("simple"),
    admin: bundle(simple("admin"), {
      article: route<{ id: number }>("article/:id"),
      user: simple("user")
    }),
    dev: filesystem("dev")
  })
);

export const { RouteLink, Redirect } = routifyBuilder(flattenRoutes);
