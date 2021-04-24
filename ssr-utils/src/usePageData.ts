import { useContext } from 'react';

import { PageDataContext } from './PageDataProvider';

export const usePageData = (path: string) =>
  useContext(PageDataContext)?.pageData[path];

export const useSetPageData = () => useContext(PageDataContext)?.setPageData;
