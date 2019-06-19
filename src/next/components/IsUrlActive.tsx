import * as React from "react";
import { RouteUrl, getRouteUrl } from "../routifyBuilder";
import { FlattenRoutes } from "../../router";
import { isUrlActive } from "../isUrlActive";
import useRoutify from "../useRoutify";

export interface Props {
  url: RouteUrl;
  active?: string;
  strict?: boolean;
  children: React.ReactElement;
}

const IsUrlActive = (flattenRoutes: FlattenRoutes): React.FC<Props> => ({
  children,
  url,
  active = "active",
  strict = false
}) => {
  const { router } = useRoutify(flattenRoutes);
  const child = React.Children.only(children);
  const className =
    router &&
    isUrlActive(flattenRoutes)(router.asPath, getRouteUrl(url), strict)
      ? active
      : "";

  return React.cloneElement(child, {
    className: child.props.className
      ? child.props.className + " " + className
      : className
  });
};

export default IsUrlActive;
