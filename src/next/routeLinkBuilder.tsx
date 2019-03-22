import * as React from "react";
import Link from "next/link";
import { Router } from "../router";
import getHrefUrl from "./getHrefUrl";

export interface ILinkProps {
  prefetch?: boolean;
  to: string;
  children: React.ReactElement<any>;
}

export default <TArgs, TChildren>(routes: Router<TArgs, TChildren>) => {
  const RouteLink: React.FC<ILinkProps> = props => {
    const linkProps = { ...props };
    delete linkProps.to;
    delete linkProps.children;

    return (
      <Link {...linkProps} as={props.to} href={getHrefUrl(props.to, routes)}>
        {props.children}
      </Link>
    );
  };

  return RouteLink;
};
