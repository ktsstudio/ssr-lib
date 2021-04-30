import { matchRoutes, RouteConfig } from 'react-router-config';

import { AppContextType, PageDataType } from '../AppContext';

export const loadRoutesData = async (
  routes: RouteConfig[],
  path: string,
  appContext: AppContextType,
  pageData: PageDataType = {}
) => {
  const promises: any[] = matchRoutes(routes, path).map(({ route, match }) => ({
    path: route.path,
    url: match.url,
    promise: (route?.component as any)
      ?.load()
      .then(({ default: { type, loadData } }: any) => {
        const load = loadData || type?.loadData;
        return load ? load(match, appContext, pageData) : Promise.resolve(null);
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
