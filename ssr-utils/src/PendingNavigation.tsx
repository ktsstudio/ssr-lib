import * as React from 'react';
import { Route, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { RouteConfig } from 'react-router-config';
import TopBarProgress from 'react-topbar-progress-indicator';

import { loadRoutesData } from './loadData';
import { useSetPageData } from './usePageData';

TopBarProgress.config({
  barColors: {
    '0': '#f7fff5',
    '1.0': '#8fff7c',
  },
  shadowBlur: 5,
});

type Props = { routes: RouteConfig[]; children: React.ReactNode };

const PendingNavigation: React.FC<Props> = ({ routes, children }: Props) => {
  const location = useLocation();
  const [
    currentLocation,
    setCurrentLocation,
  ] = useState<History.Location | null>(location);
  const [prevLocation, setPrevLocation] = useState<History.Location | null>(
    location
  );
  const [isLoading, setIsLoading] = useState(false);

  const setPageData = useSetPageData();

  useEffect(() => {
    if (window.__INITIAL_LOAD__) {
      return;
    }
    setPrevLocation(currentLocation);
    setCurrentLocation(location);
    setIsLoading(true);

    loadRoutesData(routes, location.pathname, true).then((data) => {
      setIsLoading(false);
      setPageData(data);
      setPrevLocation(null);
    });
  }, [location]);

  return (
    <>
      {isLoading && <TopBarProgress />}
      <Route
        location={prevLocation || currentLocation || location}
        render={() => children}
      />
    </>
  );
};

export default React.memo(PendingNavigation);
