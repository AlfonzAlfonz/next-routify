import * as React from "react";
import { WithRouterProps, withRouter } from "next/router";
import { match } from "../match";
import { FlattenRoutes } from "../router";
import { push, replace } from "./redirect";

export interface WithRoutify<P = {}, Q = {}> extends WithRouterProps<Q> {
  parameters: P;
  params: P;
  query: Q;
  push: (url: string) => Promise<boolean>;
  replace: (url: string) => Promise<boolean>;
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
    return (
      <Component
        {...props}
        query={query}
        parameters={params}
        params={params}
        push={push(props.router!.router!, flattenRoutes)}
        replace={replace(props.router!.router!, flattenRoutes)}
      />
    );
  });
};

export default withRoutify;
