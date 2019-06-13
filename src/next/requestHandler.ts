import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { Server } from "next-server";
import { FlattenRoutes } from "../router";
import { match } from "../match";
import { join } from "../utils";

const requestHandler = (
  app: Server,
  flattenRoutes: FlattenRoutes,
  includeParamsInQuery?: boolean
) => {
  const handle = app.getRequestHandler();

  return (req: IncomingMessage, res: ServerResponse) => {
    const { pathname, query } = parse(req.url!, true);
    const result = match(pathname!, flattenRoutes);

    if (result && flattenRoutes[result.path].options.filesystem) {
      return app.render(
        req,
        res,
        join(
          flattenRoutes[result.path].filename,
          (result.params as any).path || ""
        ),
        includeParamsInQuery
          ? { ...result.params, ...query }
          : {
              ...query
            }
      );
    }

    if (result) {
      return app.render(
        req,
        res,
        flattenRoutes[result.path].filename,
        includeParamsInQuery
          ? { ...result.params, ...query }
          : {
              ...query
            }
      );
    }

    return handle(req, res);
  };
};

export default requestHandler;
