import * as React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";

import App from "./App";

loadableReady(() => {
  const root = document.getElementById("app");
  hydrate(<App />, root);
});
