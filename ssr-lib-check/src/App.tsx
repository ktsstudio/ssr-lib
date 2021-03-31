import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes";

export { routes } from "./routes";

const App: React.FC = React.memo(() => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
});

export default App;
