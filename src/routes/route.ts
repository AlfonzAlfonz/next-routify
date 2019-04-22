import { resolvePath } from "../utils";
import { RouteEndpoint } from "./index";
import { routeData } from "../routeData";

export type Route<TArgs = {}> = (args: TArgs) => RouteEndpoint;

export const route = <TArgs = {}>(path: string, filename?: string) => {
  return routeData(
    (args: TArgs) => ({
      url: resolvePath(path, args)
    }),
    { path, filename }
  );
};
