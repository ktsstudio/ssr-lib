import * as React from 'react';
import { useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const PageDataContext = React.createContext<{
  pageData: Record<string, any>;
  setPageData: (data: any) => void;
}>({ pageData: {}, setPageData: () => {} });

const PageDataProvider: React.FC<Props> = ({ children }: Props) => {
  const [pageData, setPageData] = useState(
    typeof window !== 'undefined' ? (window as any).__CONTEXT__.routesData : {}
  );

  const value = useMemo(
    () => ({
      pageData,
      setPageData,
    }),
    [pageData]
  );

  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
};

export default React.memo(PageDataProvider);
