import * as React from 'react';
import { RouteConfig } from 'react-router-config';
import { Route } from 'react-router';

import { usePageDataContext } from './useAppContext';

type Props = { route: RouteConfig; path: string };

const SSRRoute: React.FC<Props> = ({ route, path }: Props) => {
  const pageData = usePageDataContext().pageData[route.path as string];

  const Component = route.component as any;

  return (
    <Route
      path={path}
      exact={route.exact}
      strict={route.strict}
      render={(p) => <Component route={route} pageData={pageData} {...p} />}
    />
  );
};

export default React.memo(SSRRoute);
