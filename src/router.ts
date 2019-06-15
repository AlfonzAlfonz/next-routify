import { join } from "./utils";
import { WithRouteData, RouteOptions } from "./routeData";

const flattenRoutes = (
  input: WithRouteData,
  acc: any,
  parentPaths: string[],
  parentFilenames: string[]
) => {
  if (input.routeData) {
    const path = join(parentPaths[0], input.routeData.path);
    const filename = join(
      parentFilenames[0],
      input.routeData.filename !== null &&
        input.routeData.filename !== undefined
        ? input.routeData.filename
        : input.routeData.path.replace(/\/:[a-zA-Z]+\/*$/, "")
    );
    acc[path] = {
      filename,
      options: input.routeData.options,
      parents: {
        paths: parentPaths.slice(0, parentPaths.length - 1),
        filenames: parentFilenames.slice(0, parentPaths.length - 1)
      }
    };
    const children = input({});
    Object.keys(children).map(k =>
      flattenRoutes(
        children[k],
        acc,
        [path, ...parentPaths],
        [filename, ...parentFilenames]
      )
    );
  }
  return acc;
};

interface TransformRouter {
  <T>(input: T, parent: string): T;
  (input: string, parent: string): string;
}

const transformRoutes: TransformRouter = <T extends any>(
  input: T | string,
  parent: string
): T | string => {
  if (typeof input === "function") {
    return ((...args: any) => {
      const children = input(...args);
      return Object.keys(children).reduce(
        (acc, val) => ({
          ...acc,
          [val]: transformRoutes(
            children[val],
            join(
              parent,
              children.url !== undefined ? children.url : input.routeData.path
            )
          )
        }),
        {}
      );
    }) as any;
  } else {
    return parent;
  }
};

export interface FlattenRoutes {
  [id: string]: {
    filename: string;
    options: RouteOptions;
    parents: { paths: string[]; filenames: [] };
  };
}

export interface Router<T> {
  routes: T;
  flattenRoutes: FlattenRoutes;
}

const router = <T>(input: T): Router<T> => ({
  routes: transformRoutes<T>(input, ""),
  flattenRoutes: flattenRoutes(input as any, {}, [""], [""])
});

export default router;
