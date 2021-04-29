import * as React from 'react';
import { RouteConfig } from 'react-router-config';
import { RouteProps } from 'react-router';

import { usePageDataContext } from './useAppContext';

type Props = RouteProps & { route: RouteConfig };

const SSRRoute: React.FC<Props> = ({ route, ...props }: Props) => {
  const pageData = usePageDataContext().pageData[route.path as string];

  const Component = route.component as any;

  return <Component route={route} pageData={pageData} {...props} />;
};

export default React.memo(SSRRoute);
