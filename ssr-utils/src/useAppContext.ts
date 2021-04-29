import { useContext } from 'react';

import {
  AppContext,
  AppContextType,
  PageDataContext,
  PageDataContextType,
} from './AppContext';

export const usePageDataContext = (): PageDataContextType => {
  const value = useContext(PageDataContext);
  if (!value) {
    throw new Error('Use page data inside context!');
  }

  return value;
};

export function useAppContext<T extends AppContextType>(): T {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error('Use app data inside context!');
  }

  return value as T;
}
