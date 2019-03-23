import StringMap from "../StringMap";
import { match } from "../match";
import { getRouteFilename } from "../flattenRoutes";
import { RouteData } from "../routes/route";

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
  flattenRoutes: StringMap<RouteData<{}, {}>>
) => {
  const m = match<StringMap<string>>(url, flattenRoutes);
  return getRouteFilename(flattenRoutes[m.path]) + createQuery(m.params);
};

export default getHrefUrl;
