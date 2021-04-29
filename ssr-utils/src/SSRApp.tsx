import * as React from 'react';
import { SwitchProps } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { useEffect } from 'react';

import PendingNavigation from './PendingNavigation';
import { AppContextType, ServerContextType } from './AppContext';

type Props = {
  switchProps?: SwitchProps;
  routes: RouteConfig[];
  serverContext?: ServerContextType;
  appContext: AppContextType;
  children: React.ReactNode;
};

const SSRApp: React.FC<Props> = ({
  routes,
  serverContext,
  appContext,
  children,
}: Props) => {
  useEffect(() => {
    window.__INITIAL_LOAD__ = false;
  }, []);

  return (
    <PendingNavigation
      routes={routes}
      serverContext={serverContext}
      appContext={appContext}
    >
      {children}
    </PendingNavigation>
  );
};

export default React.memo(SSRApp);
