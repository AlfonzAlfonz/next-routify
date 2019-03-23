import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import handleRequest from "./handleRequest";
import { Server } from "next-server";
import StringMap from "../StringMap";
import { RouteData } from "../routes/route";

const requestHandler = (
  app: Server,
  flattenRoutes: StringMap<RouteData<{}>>
) => {
  const handle = app.getRequestHandler();

  return (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url as string, true);
    const { pathname, query } = parsedUrl;

    handleRequest(pathname, flattenRoutes)(
      data =>
        app.render(req, res, data.filename, {
          ...query,
          ...data.params
        }),
      () => handle(req, res, parsedUrl)
    );
  };
};

export default requestHandler;
