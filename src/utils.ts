export const join = (parent: string, path: string) =>
  (parent === "/" ? parent : parent + "/") + path;
