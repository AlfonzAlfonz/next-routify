import StringMap from "./StringMap";
import { RouteData } from "./routes/route";
import { match } from "./match";
import { getRouteFilename } from "./flattenRoutes";

interface IMatchedData {
  filename: string;
  params: StringMap<string>;
}

export default (
  pathname: string | undefined,
  flattenRoutes: StringMap<RouteData<{}>>
) => (some: (data: IMatchedData) => unknown, none: () => unknown) => {
  const result = match<StringMap<string>>(pathname as string, flattenRoutes);
  return result
    ? some({
        filename: getRouteFilename(flattenRoutes[result.path]),
        params: result.params
      })
    : none();
};
