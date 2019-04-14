import { RouteEndpoint } from "./index";

export type Simple = () => RouteEndpoint;

export const simple = (path: string, filename?: string) => {
  const func = () => ({
    url: path
  });
  func.routeData = { path, filename };
  return func;
};
