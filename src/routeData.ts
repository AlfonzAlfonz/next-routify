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

export const routeData = <T extends (...args: any[]) => unknown>(
  func: T,
  data: {
    path: string;
    filename?: string;
    options?: RouteOptions;
  }
): T & WithRouteData => {
  const f: any = func.bind({});
  f.routeData = { options: {}, ...data };
  return f;
};
