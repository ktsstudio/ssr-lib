import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import { RouteConfig } from "react-router-config";
import { SSRApp } from "@kts/ssr-utils";

import { routes } from "./routes";

export { routes } from "./routes";

const App: React.FC = React.memo(() => {
  return <SSRApp routes={routes as RouteConfig[]} />;
});

export default App;
