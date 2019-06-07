import { FlattenRoutes } from "../router";
import RouteLink from "./components/RouteLink";
import Redirect from "./components/Redirect";

export type RouteUrl = { url: string } | string;

export default (flattenRoutes: FlattenRoutes) => ({
  RouteLink: RouteLink(flattenRoutes),
  Redirect: Redirect(flattenRoutes)
});
