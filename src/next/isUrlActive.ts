import { FlattenRoutes } from "../router";
import { match } from "../match";
import { RouteUrl, getRouteUrl } from "./routifyBuilder";

export const isUrlActive = (flattenRoutes: FlattenRoutes) => (
  subject: RouteUrl | null | undefined,
  url: RouteUrl,
  strict: boolean = false
): boolean => {
  const mSubject = match(getRouteUrl(subject), flattenRoutes);
  const mUrl = match(getRouteUrl(url), flattenRoutes);
  return (
    !!mSubject &&
    !!mUrl &&
    (mSubject.path === mUrl.path ||
      (!strict &&
        isChildOf(getRouteUrl(subject), getRouteUrl(url), flattenRoutes)))
  );
};

const isChildOf = (
  subject: string | null | undefined,
  url: string,
  flattenRoutes: FlattenRoutes
) =>
  flattenRoutes[match(subject, flattenRoutes)!.path].parents.paths.includes(
    url
  );
