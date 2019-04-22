import { resolvePath } from "../utils";
import { RouteEndpoint } from "./index";
import { RouteData } from "../routeData";

export interface Route<TArgs = {}> {
  (args: TArgs): RouteEndpoint;
  routeData: RouteData;
}

export const route = <TArgs = {}>(
  path: string,
  filename?: string
): Route<TArgs> => {
  const f = (args: TArgs) => ({
    url: resolvePath(path, args)
  });
  f.routeData = { path, filename, options: {} };
  return f;
};
