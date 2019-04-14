import * as React from "react";
import Link from "next/link";
import { withRouter, WithRouterProps } from "next/router";
import getHrefUrl from "./getHrefUrl";
import { isUrlActive } from "./IsUrlActive";
import { FlattenRoutes } from "../router";

export type RouteUrl = string | { url: string };

export interface ILinkProps {
  prefetch?: boolean;
  to: RouteUrl;
  children: React.ReactElement<any>;
  active?: string;
}

export default (flattenRoutes: FlattenRoutes) => {
  const RouteLink: React.FC<ILinkProps & WithRouterProps<{}>> = props => {
    const linkProps = { ...props };
    delete linkProps.to;
    delete linkProps.children;
    delete linkProps.router;

    const url = typeof props.to === "string" ? props.to : props.to.url;

    return (
      <Link {...linkProps} as={url} href={getHrefUrl(url, flattenRoutes)}>
        {(props.active
          ? () => {
              const child = React.Children.only(props.children);
              const className = isUrlActive(url, props.router)
                ? props.active
                : "";

              return React.cloneElement(child, {
                className: child.props.className
                  ? child.props.className + " " + className
                  : className
              });
            }
          : () => props.children)()}
      </Link>
    );
  };

  return withRouter(RouteLink);
};
