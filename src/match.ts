import StringMap from "StringMap";
import * as pathToRegexp from "path-to-regexp";
import { RouteData } from "./index";

export interface IMatch<TParams> {
  path: string;
  params: TParams;
}

// Match url to flattenRoute
export const match = <TParams>(
  path: string,
  routes: StringMap<RouteData<{}>>
): IMatch<TParams> =>
  Object.keys(routes)
    .map(k => {
      const keys: pathToRegexp.Key[] = [];
      const regex = pathToRegexp(k, keys);

      if (regex.test(path)) {
        const [url, ...tokens] = regex.exec(path) as string[];

        return {
          path: k,
          params: keys.reduce(
            (acc, val, i) => ({ ...acc, [val.name]: tokens[i] }),
            ({} as TParams) as any
          )
        };
      }
    })
    .find(r => r !== undefined) as IMatch<TParams>;
