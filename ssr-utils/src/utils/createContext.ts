import * as React from 'react';

export const createContext = <T>(): [React.Context<T>, () => T] => {
  const ctx = React.createContext<T>(undefined!);

  const useCtx = () => {
    const value = React.useContext(ctx);
    if (!value) {
      throw new Error('Use ctx inside context!');
    }

    return value;
  };

  return [ctx, useCtx];
};
