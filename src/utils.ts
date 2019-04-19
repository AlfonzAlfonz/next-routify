export const join = (parent: string, path: string) =>
  !parent && !path ? "/" : parent + (parent === "/" || !path ? "" : "/") + path;

// Replace wild cards with value /post/:id => /post/hello
export const resolvePath = <TArgs extends Record<string, any>>(
  path: string,
  args: TArgs
) =>
  Object.keys(args).reduce(
    (acc, k) => acc.replace(new RegExp(`:${k}`), args[k]),
    path
  );
