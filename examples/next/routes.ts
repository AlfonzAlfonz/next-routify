import { route, simple, bundle, router, routeLinkBuilder } from "../../dist";

export const { routes, flattenRoutes } = router(
  bundle(simple(""), {
    article: route<{ id: number }>("article/:id"),
    simple: simple("simple"),
    admin: bundle(simple("admin"), {
      article: route<{ id: number }>("article/:id"),
      user: simple("user")
    })
  })
);

export const RouteLink = routeLinkBuilder(flattenRoutes);
