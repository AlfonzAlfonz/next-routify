import { FlattenRoutes } from "../router";
import RouteLink from "./components/RouteLink";
import Redirect from "./components/Redirect";
import IsUrlActive from "./components/IsUrlActive";
import { isUrlActive } from "./isUrlActive";

export type RouteUrl = { url: string } | string;

export const getRouteUrl = (url: RouteUrl): string =>
  typeof url === "string" ? url : url.url;

export default (flattenRoutes: FlattenRoutes) => ({
  RouteLink: RouteLink(flattenRoutes),
  Redirect: Redirect(flattenRoutes),
  IsUrlActive: IsUrlActive(flattenRoutes),
  isUrlActive: isUrlActive(flattenRoutes)
});
