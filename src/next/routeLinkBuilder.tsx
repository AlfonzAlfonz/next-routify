import * as React from "react";
import Link from "next/link";
import { Router } from "../router";
import getHrefUrl from "./getHrefUrl";
import StringMap from "../StringMap";
import { RouteData } from "../routes/route";

export interface ILinkProps {
  prefetch?: boolean;
  to: string;
  children: React.ReactElement<any>;
}

export default <TArgs, TChildren>(
  flattenRoutes: StringMap<RouteData<{}, {}>>
) => {
  const RouteLink: React.FC<ILinkProps> = props => {
    const linkProps = { ...props };
    delete linkProps.to;
    delete linkProps.children;

    return (
      <Link
        {...linkProps}
        as={props.to}
        href={getHrefUrl(props.to, flattenRoutes)}
      >
        {props.children}
      </Link>
    );
  };

  return RouteLink;
};