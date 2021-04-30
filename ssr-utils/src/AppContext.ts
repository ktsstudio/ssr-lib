import { createContext } from './utils/createContext';

export interface AppContextType {
  serialize(): Record<string, any>;
}

export type PageDataType = Record<string, any>;

export type PageDataContextType = {
  pageData: PageDataType;
  setPageData: (d: Record<string, any>) => void;
};

export const [
  PageDataContext,
  usePageDataContext,
] = createContext<PageDataContextType>();

export const [AppContext, useAppContext] = createContext<AppContextType>();

export type ServerContextType = {
  appContextSerialized: Record<string, any>;
} & Pick<PageDataContextType, 'pageData'>;

export const getServerContext = (
  serverContext?: ServerContextType
): ServerContextType =>
  typeof window === 'undefined'
    ? serverContext || {
        pageData: {},
      }
    : window.__SERVER_CONTEXT__;
