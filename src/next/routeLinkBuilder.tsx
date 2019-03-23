import * as React from "react";
import Link from "next/link";
import getHrefUrl from "./getHrefUrl";
import StringMap from "../StringMap";
import { RouteData } from "../routes/route";
import { isUrlActive } from "./IsUrlActive";
import { withRouter, WithRouterProps } from "next/router";

export interface ILinkProps {
  prefetch?: boolean;
  to: string;
  children: React.ReactElement<any>;
  active?: string;
}

export default <TArgs, TChildren>(
  flattenRoutes: StringMap<RouteData<{}, {}>>
) => {
  const RouteLink: React.FC<ILinkProps & WithRouterProps<{}>> = props => {
    const linkProps = { ...props };
    delete linkProps.to;
    delete linkProps.children;

    return (
      <Link
        {...linkProps}
        as={props.to}
        href={getHrefUrl(props.to, flattenRoutes)}
      >
        {(props.active
          ? () => {
              const child = React.Children.only(props.children);
              const className = isUrlActive(props.to, props.router)
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
