import * as React from 'react';
import { Route, Switch, SwitchProps } from 'react-router';
import { RouteConfig } from 'react-router-config';

import SSRRoute from './SSRRoute';

type Props = SwitchProps & { routes?: RouteConfig[] };

const SSRSwitch: React.FC<Props> = ({ routes, ...switchProps }: Props) => {
  if (!routes) {
    return null;
  }

  return (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => (
            <SSRRoute
              {...props}
              route={route}
            />
          )}
        />
      ))}
    </Switch>
  );
};

export default React.memo(SSRSwitch);
