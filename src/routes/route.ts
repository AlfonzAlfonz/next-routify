export interface Route<TArgs = {}> {
  url: (args: TArgs) => string;
}

export interface RouteData<TArgs = {}, TChildren = {}> {
  type: "route" | "bundle" | "routeIntl";
  path: string;
  filename?: string;
  children?: TChildren;
}

export const route = <TArgs>(
  path: string,
  filename?: string
): RouteData<TArgs> & Route<TArgs> => ({
  type: "route",
  url: () => "",
  path,
  filename
});

export const bundle = <TArgs, TChildren>(
  r: RouteData<TArgs>,
  children: TChildren
): RouteData<TArgs, TChildren> => ({ ...r, type: "bundle", children });
