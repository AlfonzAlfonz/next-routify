import { resolvePath } from "../utils";
import { RouteEndpoint } from "./index";

export type Route<TArgs = {}> = (args: TArgs) => RouteEndpoint;

export const route = <TArgs = {}>(path: string, filename?: string) => {
  const func = (args: TArgs) => ({
    url: resolvePath(path, args)
  });
  func.routeData = { path, filename };
  return func;
};
