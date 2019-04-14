import { createServer } from "http";
import * as next from "next";
import { requestHandler } from "../../dist";
import { flattenRoutes } from "./routes";

const app = next({
  dev: process.env.NODE_ENV !== "production"
});

app.prepare().then(() =>
  createServer(requestHandler(app, flattenRoutes))
    .addListener("error", (err: Error) => {
      console.log(err);
      throw err;
    })
    .listen(3000, () => {
      console.log("> Ready on http://localhost:3000");
    })
);
