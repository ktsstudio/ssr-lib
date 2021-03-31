import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

loadableReady(() => {
  const root = document.getElementById("app");
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
});
