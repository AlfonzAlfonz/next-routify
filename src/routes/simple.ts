import { RouteEndpoint } from "./index";
import { RouteData } from "../routeData";

export interface Simple {
  (): RouteEndpoint;
  routeData: RouteData;
}

export const simple = (path: string, filename?: string): Simple => {
  const f = () => ({
    url: path
  });
  f.routeData = { path, filename, options: {} };
  return f;
};
