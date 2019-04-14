import { match } from "../match";
import { FlattenRoutes } from "../router";
import { parse } from "url";

const createQuery = (data: Record<string, string>) => {
  const keys = Object.keys(data);
  return keys.length === 0
    ? ""
    : "?" +
        keys
          .reduce<string[]>(
            (acc, k) => [...acc, `${k}=${encodeURIComponent(data[k])}`],
            []
          )
          .join("&");
};

const getHrefUrl = (url: string, flattenRoutes: FlattenRoutes) => {
  const { query } = parse(url);
  const m = match<Record<string, string>>(url, flattenRoutes);
  return flattenRoutes[m.path] + (query ? "?" + query : "");
};

export default getHrefUrl;
