import { RouterProps } from "next-server/router";
import { FlattenRoutes } from "../router";
import getHrefUrl from "./getHrefUrl";
import { RouteUrl, getRouteUrl } from "./routifyBuilder";

export const push = (
  router: RouterProps<any>,
  flattenRoutes: FlattenRoutes
) => (url: RouteUrl) => {
  const val = getRouteUrl(url);
  const href = getHrefUrl(val, flattenRoutes);
  return router.push(href || val, val);
};

export const replace = (
  router: RouterProps<any>,
  flattenRoutes: FlattenRoutes
) => (url: RouteUrl) => {
  const val = getRouteUrl(url);
  const href = getHrefUrl(val, flattenRoutes);
  return router.replace(href || val, val);
};
