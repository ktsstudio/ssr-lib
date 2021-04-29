import "core-js/stable";
import "regenerator-runtime/runtime";

import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";

import App from "./App";

loadableReady(() => {
  const root = document.getElementById("app");

  const store = (App as any).createContext(
    window.__SERVER_CONTEXT__.appContextSerialized
  );

  hydrate(
    <BrowserRouter>
      <App appContext={store} />
    </BrowserRouter>,
    root
  );
});
