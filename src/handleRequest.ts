// import { match } from "./match";
// import StringMap from "StringMap";
// import { RouteData } from "routes/route";
// import { getRouteFilename } from "./flattenRoutes";

// interface IMatchedData {
//   filename: string;
//   params: StringMap<string>;
// }

// export default (
//   pathname: string | null,
//   flattenRoutes: StringMap<RouteData<{}>>
// ): Promise<IMatchedData> => {
//   const result = match<StringMap<string>>(pathname as string, flattenRoutes);
//   return new Promise((resolve, reject) =>
//     result
//       ? resolve({
//           filename: getRouteFilename(flattenRoutes[result.path]),
//           params: result.params
//         })
//       : reject()
//   );
// };
