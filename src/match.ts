import * as pathToRegexp from "path-to-regexp";
import { FlattenRoutes } from "./router";
import { parse } from "url";

export interface IMatch<TParams> {
  path: string;
  params: TParams;
}

// Match url to flattenRoute
export const match = <TParams = {}>(
  p: string | null | undefined,
  flattenRoutes: FlattenRoutes
): IMatch<TParams> | undefined => {
  const { pathname } = parse(p || "");
  return Object.keys(flattenRoutes)
    .map(k => {
      const keys: pathToRegexp.Key[] = [];
      const regex = pathToRegexp(k, keys);

      if (regex.test(pathname || "")) {
        const [_, ...tokens] = regex.exec(pathname || "") as string[];

        return {
          path: k,
          params: keys.reduce(
            (acc, val, i) => ({ ...acc, [val.name]: tokens[i] }),
            ({} as TParams) as any
          )
        };
      }
    })
    .find(r => r !== undefined);
};
