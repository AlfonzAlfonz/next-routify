# Next Routify

[![Build Status](https://travis-ci.org/AlfonzAlfonz/next-routify.svg?branch=master)](https://travis-ci.org/AlfonzAlfonz/next-routify)

Routing alternative for safe urls with typed parameters.

- Define routes with or without parameters
- Generate urls for links
- Integrated request handler
- Retrieve parameters from path separately from query

## Setup with typescript

Check out the example [app](./examples/next/)

**Install it:**

```bash
npm install --save next-routify ts-node

yarn add next-routify ts-node
```

**Create routes.ts with your routes in root directory:**

```typescript
import { route, simple, bundle, router, routeLinkBuilder } from "next-routify";
const { routes, flattenRoutes } = router(
  // Define root route
  bundle(simple(""), {
    // Route with parameter id
    article: route<{ id: number }>("article/:id"),
    // Route without parameters
    user: simple("user"),
    // Nested routes
    admin: bundle(simple("admin"), {
      article: route<{ id: number }>("article/:id"),
      user: simple("user")
    })
  })
);

// Component for creating links and redirect component
export const { RouteLink, Redirect } = routifyBuilder(flattenRoutes);
```

**Create server.ts in root directory:**

```typescript
import { createServer } from "http";
import * as next from "next";
import { requestHandler } from "next-routify";
import { flattenRoutes } from "./routes";

const app = next({
  dev: process.env.NODE_ENV !== "production"
});

app.prepare().then(() => {
  createServer(requestHandler(app, flattenRoutes))
    .addListener("error", err => {
      console.log(err);
      throw err;
    })
    .listen(3000, () => {
      console.log("> Ready on http://localhost:3000");
    });
});
```

**Create tsconfig.server.json**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "lib": ["dom", "es2017"]
  }
}
```

**Add script to your package.json:**

```json
{
  "scripts": {
    "next": "ts-node --project tsconfig.server.json server.ts"
  }
}
```

**Now you can run server simply with:**

```bash
yarn next
```

## Get url

Get url as string:

```typescript
// /
routes().url;

// /article/5
routes().article({ id: 5 }).url;

// /user
routes().user().url;

// /admin
routes().admin().url;

// /admin/article/5
routes()
  .admin()
  .article({ id: 5 }).url;

// /admin/user
routes()
  .admin()
  .user().url;
```

Create link to a route:

```tsx
<RouteLink to={routes().article({ id: 5 })}>
  <a>Click here</a>
</RouteLink>
```

## Retrieve parameters from path

```typescript
interface WithRoutify<P = {}, Q = {}> extends WithRouterProps<Q> {
  parameters: P;
  query: Q;
}
```

```typescript
withRouter(flattenRoutes)(Component);
```

```tsx
import { withRoutify, WithRoutify } from "next-routify";
import { flattenRoutes, RouteLink, routes } from "routes";

// Every parameter is retrieved as string
const Component: React.FC<WithRoutify<{ id: string }>> = ({ parameters, query, router }) => {
  console.log(parameters.id);

  return (
    ...
  );
};

export default withRoutify(flattenRoutes)(Article);
```

## Check whether an url is active

Inject class to its child:

```tsx
<IsActive url={routes.url({}).article({ id: 5 })}>
  <li class="nav-item">
    <RouteLink to={routes.url({}).article({ id: 5 })}>
      <a>Article 5</a>
    </RouteLink>
  </li>
</IsActive>
```

API:

```typescript
interface IsActiveProps {
  url: RouteUrl; // Url to check
  active?: string; // Class to inject (default: active)
  children: React.ReactElement; // Single react element
}
```

Use with Routelink

```tsx
<RouteLink to={routes().article({ id: 5 })} active="active">
  <a>Click here</a>
</RouteLink>
```
