import * as React from 'react';

export interface AppContextType {
  [k: string]: any;
  serialize(): Record<string, any>;
}

export type PageDataType = Record<string, any>;

export type PageDataContextType = {
  pageData: PageDataType;
  setPageData: (d: Record<string, any>) => void;
};

export const PageDataContext = React.createContext<PageDataContextType>({
  pageData: {},
  setPageData: () => {},
});

export const AppContext = React.createContext<AppContextType>({
  serialize: () => ({}),
});

export type ServerContextType = {
  appContextSerialized: Record<string, any>;
} & Pick<PageDataContextType, 'pageData'>;

const isServer = typeof window === 'undefined';

export const getServerContext = (
  serverContext?: ServerContextType
): ServerContextType =>
  isServer
    ? serverContext || {
        pageData: {},
      }
    : window.__SERVER_CONTEXT__;
