import { router } from "../src/router";
import { bundle, route } from "../src/routes/route";

const { routes } = router(
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

routes.article.url({ id: 5 });
routes.user.url({});
