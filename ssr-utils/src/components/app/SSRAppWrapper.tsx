import * as React from 'react';
import { __RouterContext, SwitchProps } from 'react-router';
import { RouteConfig } from 'react-router-config';
import TopBarProgress from 'react-topbar-progress-indicator';

import {
  AppContextType,
  ServerContextType,
  AppContext,
  PageDataContext,
} from '../../AppContext';

import { usePageLoader } from './usePageLoader';

type Props = {
  switchProps?: SwitchProps;
  routes: RouteConfig[];
  serverContext?: ServerContextType;
  appContext: AppContextType;
  children: React.ReactNode;
};

const SSRAppWrapper: React.FC<Props> = ({
  routes,
  serverContext,
  appContext,
  children,
}: Props) => {
  const [routerValue, pageDataValue, isLoading] = usePageLoader(
    routes,
    appContext,
    serverContext
  );

  return (
    <__RouterContext.Provider value={routerValue}>
      <PageDataContext.Provider value={pageDataValue}>
        <AppContext.Provider value={appContext}>
          {isLoading && <TopBarProgress />}
          {children}
        </AppContext.Provider>
      </PageDataContext.Provider>
    </__RouterContext.Provider>
  );
};

export default React.memo(SSRAppWrapper);
