export { bundle } from "./bundle";
export { route } from "./route";
export { simple } from "./simple";
export { filesystem } from "./filesystem";

export interface RouteEndpoint {
  url: string;
}

export interface RouteData {
  filename: string;
  path: string;
}
