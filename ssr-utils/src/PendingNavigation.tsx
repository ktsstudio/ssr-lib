import * as React from 'react';
import { Location } from 'history';
import { useLocation, __RouterContext } from 'react-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { RouteConfig } from 'react-router-config';
import TopBarProgress from 'react-topbar-progress-indicator';

import { loadRoutesData } from './loadData';
import {
  AppContext,
  AppContextType,
  getServerContext,
  PageDataContext,
  ServerContextType,
} from './AppContext';

TopBarProgress.config({
  barColors: {
    '0': '#f7fff5',
    '1.0': '#8fff7c',
  },
  shadowBlur: 5,
});

type Props = {
  routes: RouteConfig[];
  children: React.ReactNode;
  serverContext?: ServerContextType;
  appContext: AppContextType;
};

const PendingNavigation: React.FC<Props> = ({
  routes,
  children,
  serverContext,
  appContext,
}: Props) => {
  const location = useLocation();
  const context = useContext(__RouterContext);

  const loadedContext = getServerContext(serverContext);

  const [data, setData] = useState(loadedContext.pageData);

  const [currentLocation, setCurrentLocation] = useState<Location | null>(
    location
  );
  const [prevLocation, setPrevLocation] = useState<Location | null>(location);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.__INITIAL_LOAD__) {
      return;
    }

    setPrevLocation(currentLocation);
    setCurrentLocation(location);
    setIsLoading(true);

    loadRoutesData(routes, location.pathname, appContext, data).then(
      (loadedData) => {
        setData(loadedData);
        setIsLoading(false);
        setPrevLocation(null);
      }
    );
  }, [location]);

  const routeLocation = prevLocation || currentLocation;

  const routerValue = useMemo(
    () => ({
      ...context,
      location: routeLocation || context.location,
    }),
    [routeLocation]
  );

  const pageDataValue = useMemo(
    () => ({
      pageData: data,
      setPageData: setData,
    }),
    [routeLocation]
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

export default React.memo(PendingNavigation);
