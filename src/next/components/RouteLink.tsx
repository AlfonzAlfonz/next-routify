import * as React from "react";
import { FlattenRoutes } from "../../router";
import { RouteUrl, getRouteUrl } from "../routifyBuilder";
import { WithRouterProps, withRouter } from "next/router";
import getHrefUrl from "../getHrefUrl";
import { isUrlActive } from "../isUrlActive";
import Link, { LinkProps as OriginalLinkProps } from "next/link";

export type LinkProps = Omit<Omit<OriginalLinkProps, "href">, "as"> & {
  to: RouteUrl;
  active?: string;
  strict?: boolean;
  className?: string;
};

export default (flattenRoutes: FlattenRoutes) => {
  const RouteLink: React.FC<LinkProps & WithRouterProps<{}>> = ({
    to,
    children,
    className,
    router,
    active,
    strict = false,
    ...linkProps
  }) => {
    const url = getRouteUrl(to);
    const child = React.Children.only(children);

    return (
      <Link {...linkProps} as={url} href={getHrefUrl(url, flattenRoutes)}>
        {React.cloneElement(child, {
          className: [
            isUrlActive(flattenRoutes)(router!.asPath!, url, strict)
              ? active || ""
              : "",
            child.props.className,
            className
          ]
            .filter(x => !!x)
            .join(" ")
        })}
      </Link>
    );
  };

  return withRouter(RouteLink);
};
