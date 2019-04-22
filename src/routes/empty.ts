import { RouteData } from "../routeData";

export interface Empty {
  (): {};
  routeData: RouteData;
}

export const empty = (path: string): Empty => {
  const f = () => ({});
  f.routeData = {
    path,
    options: {}
  };
  return f;
};
