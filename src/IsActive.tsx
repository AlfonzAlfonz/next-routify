import * as React from "react";
import { withRouter, WithRouterProps } from "next/router";
import { isActive } from "./routeLinkBuilder";

interface Props {
  url: string;
  active?: string;
  children: React.ReactElement;
}

const IsActive: React.FC<WithRouterProps<{}> & Props> = ({
  router,
  children,
  url,
  active = "active"
}) => {
  const child = React.Children.only(children);
  const className = isActive(url, router) && active;
  return React.cloneElement(child, {
    className: child.props.className
      ? child.props.className + " " + className
      : className
  });
};

export default withRouter(IsActive);
