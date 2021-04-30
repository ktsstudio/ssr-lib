import * as React from 'react';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { SSRAppRoot } from '../AppTypes';

export const renderApp = (App: SSRAppRoot<any>, prepare?: () => void) => {
  loadableReady(async () => {
    const root = document.getElementById('app');

    const store = await App.createContext(
      (window as any).__SERVER_CONTEXT__.appContextSerialized
    );

    prepare?.();

    hydrate(
      <BrowserRouter>
        <App appContext={store} />
      </BrowserRouter>,
      root
    );
  });
};
