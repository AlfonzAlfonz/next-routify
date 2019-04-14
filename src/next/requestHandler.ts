import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { Server } from "next-server";
import { FlattenRoutes } from "../router";
import { match } from "../match";

const requestHandler = (app: Server, flattenRoutes: FlattenRoutes) => {
  const handle = app.getRequestHandler();

  return (req: IncomingMessage, res: ServerResponse) => {
    const { pathname, query } = parse(req.url as string, true);
    const result = match(pathname as string, flattenRoutes);

    result
      ? app.render(req, res, flattenRoutes[result.path], {
          ...result.params,
          ...query
        })
      : handle(req, res);
  };
};

export default requestHandler;
