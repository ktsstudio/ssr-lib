import * as React from 'react';
import { Route, Switch, SwitchProps, useLocation } from 'react-router';
import { RouteConfig } from 'react-router-config';

import SSRRoute from './SSRRoute';

type Props = { switchProps?: SwitchProps; routes?: RouteConfig[] };

const SSRSwitch: React.FC<Props> = ({ switchProps, routes }: Props) => {
  if (!routes) {
    return;
  }

  return (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => <SSRRoute {...props} route={route} />}
          />
        );
      })}
    </Switch>
  );
};

export default React.memo(SSRSwitch);
