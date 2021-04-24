import * as React from 'react';
import { SwitchProps } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { useEffect } from 'react';

import PageDataProvider from './PageDataProvider';
import SSRSwitch from './SSRSwitch';
import PendingNavigation from './PendingNavigation';

type Props = {
  switchProps?: SwitchProps;
  routes: RouteConfig[];
};

const SSRApp: React.FC<Props> = ({ switchProps, routes }: Props) => {
  useEffect(() => {
    window.__INITIAL_LOAD__ = false;
  }, []);

  return (
    <PageDataProvider>
      <PendingNavigation routes={routes}>
        <SSRSwitch switchProps={switchProps} routes={routes} />
      </PendingNavigation>
    </PageDataProvider>
  );
};

export default React.memo(SSRApp);
