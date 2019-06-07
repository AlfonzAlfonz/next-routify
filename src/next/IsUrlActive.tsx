import * as React from "react";
import { withRouter, WithRouterProps, SingletonRouter } from "next/router";
import { RouteUrl } from "./routifyBuilder";

interface Props {
  url: RouteUrl;
  active?: string;
  children: React.ReactElement;
}

export const isUrlActive = (
  url: string,
  router: SingletonRouter<any> | undefined
): boolean => {
  return url === (router as SingletonRouter).asPath;
};

const IsActive: React.FC<WithRouterProps<{}> & Props> = ({
  router,
  children,
  url,
  active = "active"
}) => {
  const child = React.Children.only(children);
  const className = isUrlActive(typeof url === "string" ? url : url.url, router)
    ? active
    : "";

  return React.cloneElement(child, {
    className: child.props.className
      ? child.props.className + " " + className
      : className
  });
};

export default withRouter(IsActive);
