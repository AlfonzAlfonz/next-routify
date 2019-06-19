import { FlattenRoutes } from "../router";
import RouteLink from "./components/RouteLink";
import Redirect from "./components/Redirect";
import IsUrlActive from "./components/IsUrlActive";
import { isUrlActive } from "./isUrlActive";

export type RouteUrl = { url: string } | string;

interface GetRouteUrl {
  (url: RouteUrl): string;
  (url: RouteUrl | null | undefined): string | null | undefined;
}

export const getRouteUrl: GetRouteUrl = ((url: RouteUrl | null | undefined) =>
  url && (typeof url === "string" ? url : url.url)) as GetRouteUrl;

export default (flattenRoutes: FlattenRoutes) => ({
  RouteLink: RouteLink(flattenRoutes),
  Redirect: Redirect(flattenRoutes),
  IsUrlActive: IsUrlActive(flattenRoutes),
  isUrlActive: isUrlActive(flattenRoutes)
});
