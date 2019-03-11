import { Route, RouteData, route } from "./routes/route";
import StringMap from "./StringMap";
import { join } from "./utils";
import { flattenRouter } from "./flattenRoutes";

export interface Router<TArgs, TChildren> {
  routes: Route<TArgs> & TChildren;
  flattenRoutes: StringMap<RouteData<{}>>;
}

export const router = <TArgs, TChildren>(
  routeData: RouteData<TArgs, TChildren>
): Router<TArgs, TChildren> => {
  return {
    routes: transform(routeData, "") as any,
    flattenRoutes: flattenRouter(routeData, "", {})
  };
};

const transform = <TArgs, TChildren extends AnyDataChildren>(
  routeData: RouteData<TArgs>,
  parent: string = ""
): Route<TArgs> & TChildren => {
  // If has any children, transform as bundle
  return routeData.children
    ? transformBundle(parent, routeData, routeData.children)
    : (transformRoute(parent, routeData) as any);
};

type AnyDataChildren = StringMap<RouteData<any>>;
type AnyChildren = StringMap<Route<any>>;

// Replace wild cards with value /post/:id => /post/hello
const resolvePath = <TArgs extends StringMap<any>>(path: string, args: TArgs) =>
  Object.keys(args).reduce(
    (acc, k) => acc.replace(new RegExp(`:${k}`), args[k]),
    path
  );

const transformBundle = <TArgs, TChildren extends AnyDataChildren>(
  parent: string,
  routeData: RouteData<TArgs>,
  children: TChildren
): Route<TArgs> & TChildren => {
  return {
    // Transform children
    ...(Object.keys(children).reduce<AnyChildren>(
      (acc, k) => ({
        ...acc,
        [k]: transform(children[k], join(parent, routeData.path))
      }),
      {}
    ) as any),
    // Transform root route
    ...transformRoute(parent, routeData)
  } as any;
};

const transformRoute = <TArgs>(
  parent: string,
  routeData: RouteData<TArgs>
): Route<TArgs> => ({
  url: (args: TArgs) => {
    const url = join(parent, routeData.path);
    return resolvePath(url === "" ? "/" : url, args);
  }
});
