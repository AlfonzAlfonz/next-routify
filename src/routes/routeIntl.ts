import { RouteData, route } from "./route";

export interface RouteIntl<TLocales extends string, TArgs = {}> {
  url: (locale: TLocales, args: TArgs) => string;
}

export const routeIntl = <TLocales extends string, TArgs = {}>(
  path: string,
  filename?: string
): RouteIntl<TLocales, TArgs> & RouteData<TArgs> => ({
  ...route(path, filename),
  type: "routeIntl"
});
