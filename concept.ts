import { bundle, route } from "./src/routes/route";


const translate = (...args: any): any => {};
const params: any = null;

const intl

const routes = translate(params.locale)(
  bundle(route(""),{
    en: bundle(
      route("locale"),
      {
        shop: route<{ id: string }>("shop/:id"),
        orders: route("orders"),
        user: route("user"),
        pepa: route("user"),
        admin: bundle(route("admin"), {
          user: route("user")
        })
      }
    ),
    cs: bundle(
      route("lang"),
      {
        shop: route<{ id: string }>("shop/:id"),
        claims: route("claims"),
        orders: route("orders"),
        user: route("user"),
        pepa: route("user"),
        admin: bundle(route("admin"), {
          user: route("user")
        })
      }
    )
  })
);

routes.routes.shop.url({ id: "5" }); // /en/shop/5
routes.routes.shop.url({ id: "5", locale: "cs" }); // cs/obchod/5
routes.routes("cs").shop.url({ id: 5 });
routes.routes().shop.url(...);