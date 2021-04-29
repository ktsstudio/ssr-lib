import * as React from 'react';
import { SwitchProps } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { useEffect } from 'react';

import SSRSwitch from './SSRSwitch';
import PendingNavigation from './PendingNavigation';
import { AppContextType, ServerContextType } from './AppContext';

type Props = {
  switchProps?: SwitchProps;
  routes: RouteConfig[];
  serverContext?: ServerContextType;
  appContext: AppContextType;
};

const SSRApp: React.FC<Props> = ({
  switchProps,
  routes,
  serverContext,
  appContext,
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
      <SSRSwitch {...switchProps} routes={routes} />
    </PendingNavigation>
  );
};

export default React.memo(SSRApp);
