import * as React from "react";
import { WithRouterProps, withRouter } from "next/router";
import { match } from "../match";
import { FlattenRoutes } from "../router";

export interface WithRoutify<P = {}, Q = {}> extends WithRouterProps<Q> {
  parameters: P;
  query: Q;
}

const withRoutify = <TOutterProps extends {} = {}>(
  flattenRoutes: FlattenRoutes
) => <P, Q>(
  Component: React.ComponentType<TOutterProps & WithRoutify<P, Q>>
) => {
  return withRouter((props: TOutterProps & WithRouterProps<Q>) => {
    const query =
      props.router && props.router.query ? props.router.query : ({} as Q);
    const params =
      props.router &&
      props.router.asPath &&
      match<P>(props.router!.asPath!, flattenRoutes)
        ? match<P>(props.router!.asPath!, flattenRoutes).params
        : ({} as P);
    return <Component {...props} query={query} parameters={params} />;
  });
};

export default withRoutify;
