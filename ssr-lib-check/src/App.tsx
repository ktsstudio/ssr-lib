import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Switch } from "react-router-dom";
import {
  AppContextType,
  ServerContextType,
  SSRApp,
  SSRRoute,
} from "@kts/ssr-utils";
import { enableStaticRendering } from "mobx-react";

import { routes } from "./routes";
import { Store, StoreData } from "./store";

export { routes } from "./routes";

type Props = {
  serverContext?: ServerContextType;
  appContext: AppContextType;
};

const App: React.FC<Props> = React.memo(
  ({ serverContext, appContext }: Props) => {
    return (
      <SSRApp
        routes={routes as RouteConfig[]}
        serverContext={serverContext}
        appContext={appContext}
      >
        <Switch>
          {routes.map((route, i) => (
            <SSRRoute
              path={route.path as string}
              route={route}
              key={route.key || i}
            />
          ))}
        </Switch>
      </SSRApp>
    );
  }
);

(App as any).createContext = (initialData?: StoreData) => {
  if (typeof window === "undefined") {
    enableStaticRendering(true);
  }

  console.log("create context", initialData);
  return new Store(initialData);
};

export default App;
