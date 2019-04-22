import { simple } from "./index";
import { join } from "../utils";

export const filesystem = (path: string, filename?: string) => {
  const func = simple(
    join(path, ":path*"),
    filename !== null && filename !== undefined ? filename : path
  );
  func.routeData.options.filesystem = true;
  return func;
};
