import { matchRoutes, RouteConfig } from 'react-router-config';

export const loadRoutesData = async (
  routes: RouteConfig[],
  path: string,
  onlyExactLoad = false
) => {
  const promises: any[] = matchRoutes(routes, path).map(({ route, match }) => ({
    path: route.path,
    promise: (route?.component as any)
      ?.load()
      .then(({ default: { type } }: any) => {
        if ((onlyExactLoad && match.isExact) || !onlyExactLoad) {
          return type.loadData ? type.loadData(match) : Promise.resolve(null);
        }
      }),
  }));

  const data = await Promise.all(promises.map((p) => p.promise));

  return promises.reduce(
    (acc, next, i) => ({
      ...acc,
      [next.path]: data[i],
    }),
    {}
  );
};
