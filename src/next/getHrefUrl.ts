import StringMap from "../StringMap";
import { Router } from "../router";
import { match } from "../match";
import { getRouteFilename } from "../flattenRoutes";

const createQuery = (data: StringMap<string>) =>
  "?" +
  Object.keys(data)
    .reduce<string[]>(
      (acc, k) => [...acc, `${k}=${encodeURIComponent(data[k])}`],
      []
    )
    .join("&");

const getHrefUrl = <TArgs, TChildren>(
  url: string,
  routes: Router<TArgs, TChildren>
) => {
  const m = match<StringMap<string>>(url, routes.flattenRoutes);
  return getRouteFilename(routes.flattenRoutes[m.path]) + createQuery(m.params);
};

export default getHrefUrl;
