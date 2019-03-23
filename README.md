# Next JS typed router

Routing alternative for safe urls with typed parameters. For creating easy to use dynamic routes.

## How to use

### Install

```
npm install --save nextjs-typed-router

yarn add nextjs-typed-router

```

### Create _routes.ts_

```typescript
const { routes, flattenRoutes } = router(
  bundle(
    route(""), // Homepage
    {
      article: route<{ id: number }>("article/:id"),
      user: route("user"),
      admin: bundle(route("admin"), {
        article: route<{ id: number }>("article/:id", "admin/article"),
        user: route("user", "admin/user")
      })
    }
  )
);
```

### Use

```typescript
// Use with parameters
routes.article.url({ id: 5 });

//
routes.user.url({});
```

### Sample Next server

```typescript
import { createServer } from "http";
import { parse } from "url";
import * as next from "next";
import { flattenRoutes } from "./src/routes";
import { handleRequest } from "nextjs-typed-router";

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src"
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
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
  })
    .addListener("error", (err: any) => {
      console.log(err);
      throw err;
    })
    .listen(3000, () => {
      console.log("> Ready on http://localhost:3000");
    });
});

```
