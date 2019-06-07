import * as React from "react";
import { FlattenRoutes } from "../../router";
import { RouteUrl } from "../routifyBuilder";
import useRoutify from "../useRoutify";

export interface Props {
  to: RouteUrl;
  replace?: boolean;
}

export default (flattenRoutes: FlattenRoutes) => {
  const Redirect: React.FC<Props> = ({ to, replace: shouldReplace }) => {
    const { push, replace } = useRoutify(flattenRoutes);
    React.useEffect(() => {
      shouldReplace ? replace(to) : push(to);
    });

    return null;
  };

  return Redirect;
};
