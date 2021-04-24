import * as React from 'react';
import { RouteConfig } from 'react-router-config';

import { usePageData } from './usePageData';

type Props = { route: RouteConfig; [k: string]: any };

const SSRRoute: React.FC<Props> = ({ route, ...rest }: Props) => {
  const pageData = usePageData(route.path as string);

  // @ts-ignore
  return <route.component {...rest} route={route} pageData={pageData} />;
};

export default React.memo(SSRRoute);
