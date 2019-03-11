import StringMap from "./StringMap";
import { RouteData } from "./index";
import { join } from "./utils";

export const flattenRouter = <
  TArgs,
  TChildren,
  TPrev extends StringMap<string>
>(
  routeData: RouteData<TArgs, TChildren>,
  parent: string,
  prev: TPrev
): StringMap<RouteData<{}>> => {
  return {
    [join(parent, routeData.path)]: routeData,
    ...(routeData.children
      ? Object.keys(routeData.children).reduce(
          (acc, k) => ({
            ...acc,
            ...flattenRouter(
              (routeData.children as any)[k],
              (parent === "/" ? "" : parent) + "/" + routeData.path,
              {}
            )
          }),
          ({} as TChildren) as any
        )
      : {}),
    ...(prev as any)
  };
};

export const getRouteFilename = (routeData: RouteData<{}>) =>
  "/" +
  (routeData.filename
    ? routeData.filename
    : routeData.path.replace(/\/:[a-zA-Z]+\/*$/, ""));
