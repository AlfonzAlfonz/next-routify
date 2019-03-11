import { router } from "../src/router";
import { bundle, route } from "../src/routes/route";
import { routeIntl } from "../src/routes/routeIntl";

const { routes } = router(
  bundle(
    route(""), // Homepage
    {
      articles: routeIntl<"us" | "uk">("articles"),
      shopUS: routeIntl<"us">("shop/:id"),
      shopUK: routeIntl<"uk">("shop/:id")
    }
  )
);

routes.articles.url("uk", {});
routes.shopUK.url("uk", {});
routes.shopUS.url("us", {});
