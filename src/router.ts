import { join } from "./utils";

const flattenRoutes = (
  input: any,
  acc: any,
  parentPath: string,
  parentFilename: string
) => {
  if (input.routeData) {
    const path = join(parentPath, input.routeData.path);
    const filename = join(
      parentFilename,
      input.routeData.filename ||
        input.routeData.path.replace(/\/:[a-zA-Z]+\/*$/, "")
    );
    acc[path] = filename;
    const children = input({});
    Object.keys(children).map(k =>
      flattenRoutes(children[k], acc, path, filename)
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
          [val]: transformRoutes(children[val], join(parent, children.url))
        }),
        {}
      );
    }) as any;
  } else {
    return parent;
  }
};

export interface FlattenRoutes {
  [id: string]: string;
}

export interface Router<T> {
  routes: T;
  flattenRoutes: FlattenRoutes;
}

const router = <T>(input: T): Router<T> => ({
  routes: transformRoutes<T>(input, ""),
  flattenRoutes: flattenRoutes(input, {}, "", "")
});

export default router;
