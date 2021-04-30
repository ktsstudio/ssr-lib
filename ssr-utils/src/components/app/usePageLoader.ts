import {
  __RouterContext,
  RouteComponentProps,
  useLocation,
} from 'react-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { RouteConfig } from 'react-router-config';
import { Location } from 'history';

import {
  AppContextType,
  getServerContext,
  PageDataContextType,
  ServerContextType,
} from '../../AppContext';
import { loadRoutesData } from '../../utils/loadData';

export const usePageLoader = (
  routes: RouteConfig[],
  appContext: AppContextType,
  serverContext?: ServerContextType
): [RouteComponentProps, PageDataContextType, boolean] => {
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
      window.__INITIAL_LOAD__ = false;
      return;
    }

    setPrevLocation(currentLocation);
    setCurrentLocation(location);
    setIsLoading(true);

    loadRoutesData(routes, location.pathname, appContext, data).then(
      (loadedData) => {
        setData((s) => ({
          ...s,
          ...loadedData,
        }));
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

  return [routerValue, pageDataValue, isLoading];
};
