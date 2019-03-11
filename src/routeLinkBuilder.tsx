import * as React from "react";
import Link from "next/link";
import { Router } from "./router";
import { match, getRouteFilename } from "./index";
import StringMap from "./StringMap";
import { SingletonRouter } from "next/router";

export interface ILinkProps {
  prefetch?: boolean;
  to: string;
  children: React.ReactElement<any>;
}

export default <TArgs, TChildren>(routes: Router<TArgs, TChildren>) => {
  const RouteLink: React.FC<ILinkProps> = props => {
    const m = match<StringMap<string>>(props.to, routes.flattenRoutes);
    const sourceUrl =
      getRouteFilename(routes.flattenRoutes[m.path]) + createQuery(m.params);
    const linkProps = { ...props };
    delete linkProps.to;
    delete linkProps.children;

    return (
      <Link {...linkProps} as={props.to} href={sourceUrl}>
        {props.children}
      </Link>
    );
  };

  return RouteLink;
};

export const isActive = (
  url: string,
  router: SingletonRouter<any> | undefined
): boolean => {
  return url === (router as SingletonRouter).asPath;
};

const createQuery = (data: StringMap<string>) =>
  "?" +
  Object.keys(data)
    .reduce<string[]>(
      (acc, k) => [...acc, `${k}=${encodeURIComponent(data[k])}`],
      []
    )
    .join("&");
