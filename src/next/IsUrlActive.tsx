import * as React from "react";
import { withRouter, WithRouterProps, SingletonRouter } from "next/router";

interface Props {
  url: string;
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
  const className = isUrlActive(url, router) ? active : "";
  return React.cloneElement(child, {
    className: child.props.className
      ? child.props.className + " " + className
      : className
  });
};

export default withRouter(IsActive);
