export { Route, RouteData, route, bundle } from "./routes/route";
export { RouteIntl, routeIntl } from "./routes/routeIntl";
export { match, IMatch } from "./match";
export { Router, router } from "./router";
export { getRouteFilename } from "./flattenRoutes";

// Next
export { default as handleRequest } from "./next/handleRequest";
export { default as IsActive, isUrlActive } from "./next/IsUrlActive";
export {
  ILinkProps,
  default as routeLinkBuilder
} from "./next/routeLinkBuilder";
export { default as getHrefUrl } from "./next/getHrefUrl";
