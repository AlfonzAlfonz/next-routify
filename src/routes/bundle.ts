import { Simple } from "./simple";
import { RouteEndpoint } from ".";
import { Route } from "./route";
import { Empty } from "./empty";
import { WithRouteData } from "../routeData";

// Route as root of bundle is disabled due to parameter overwriting

interface Bundle {
  // tslint:disable-next-line: callable-types
  <TChildren extends Record<string, unknown>>(
    r: Simple,
    children: TChildren
  ): () => RouteEndpoint & TChildren;
  <TChildren extends Record<string, unknown>>(
    r: Empty,
    children: TChildren
  ): () => {} & TChildren;
  // <TChildren extends StringMap<unknown>, TArgs = {} | undefined>(
  //   r: Route<TArgs>,
  //   children: TChildren
  // ): (args: TArgs) => RouteEndpoint & TChildren;
}

export const bundle: Bundle = <
  TChildren extends Record<string, unknown> /*,
  TArgs = {} | undefined*/
>(
  r: /*Route<TArgs> |*/ Simple | Empty,
  children: TChildren
) => {
  const func = ((/*args: TArgs*/) => {
    const root = r(/*args*/);
    return {
      ...root,
      ...children
    };
  }) as any;
  func.routeData = (r as any).routeData;
  return func;
};
