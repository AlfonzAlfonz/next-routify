import { RouteEndpoint } from "./index";
import { routeData } from "../routeData";

export type Simple = () => RouteEndpoint;

export const simple = (path: string, filename?: string) =>
  routeData(
    () => ({
      url: path
    }),
    { path, filename }
  );
