import { simple } from "./index";

export const filesystem = (path: string) => {
  const func = simple(path + "/:filename");
  (func.routeData as any).filesystem = true;
  return func;
};
