import { useRouter } from "next/router";
import { match } from "../match";
import { FlattenRoutes } from "../router";
import { DefaultQuery } from "next-server/router";

const useRoutify = <P, Q = DefaultQuery>(flattenRoutes: FlattenRoutes) => {
  const router = useRouter<Q>();

  const query = router && router.query ? router.query : ({} as Q);
  const params =
    router && router.asPath && match<P>(router!.asPath!, flattenRoutes)
      ? match<P>(router!.asPath!, flattenRoutes).params
      : ({} as P);

  return { router, query, params };
};

export default useRoutify;
