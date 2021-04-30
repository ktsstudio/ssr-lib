import React from 'react';
import { match } from 'react-router';

import { AppContextType, PageDataType } from './AppContext';

export type SSRAppRoot<T> = React.ComponentType<T> & {
  createContext: (initialData?: Record<string, any>) => AppContextType;
};

export type SSRPage<T, P = any> = React.ComponentType<T & { pageData: P }> & {
  loadData: (match: match, ctx: AppContextType, pageData: PageDataType) => any;
};
