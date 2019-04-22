export interface RouteData {
  path: string;
  filename?: string;
  options: RouteOptions;
}

export interface RouteOptions {
  empty?: boolean;
  filesystem?: boolean;
}

export interface WithRouteData {
  (...args: any[]): any;
  routeData: RouteData;
}
