import * as React from "react";
import { FlattenRoutes } from "../../router";
import { RouteUrl } from "../routifyBuilder";
import { WithRouterProps, withRouter } from "next/router";
import getHrefUrl from "../getHrefUrl";
import { isUrlActive } from "../IsUrlActive";
import Link, { LinkProps as OriginalLinkProps } from "next/link";

export type LinkProps = Omit<Omit<OriginalLinkProps, "href">, "as"> & {
  to: RouteUrl;
  active?: string;
  className?: string;
};

export default (flattenRoutes: FlattenRoutes) => {
  const RouteLink: React.FC<LinkProps & WithRouterProps<{}>> = props => {
    const linkProps = { ...props };
    delete linkProps.to;
    delete linkProps.children;
    delete linkProps.className;
    delete linkProps.router;
    delete linkProps.active;

    const url = typeof props.to === "string" ? props.to : props.to.url;
    const child = React.Children.only(props.children);

    return (
      <Link {...linkProps} as={url} href={getHrefUrl(url, flattenRoutes)}>
        {React.cloneElement(child, {
          className: [
            isUrlActive(url, props.router) ? props.active || "" : "",
            child.props.className,
            props.className
          ]
            .filter(x => !!x)
            .join(" ")
        })}
      </Link>
    );
  };

  return withRouter(RouteLink);
};
