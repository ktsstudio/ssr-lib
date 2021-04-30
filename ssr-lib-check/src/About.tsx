import * as React from "react";
import { Link, Switch, useParams } from "react-router-dom";
import { RouteConfig } from "react-router-config";
import { SSRRoute, useAppContext, SSRPage } from "@kts/ssr-utils";
import { observer } from "mobx-react";
import { Store } from "./store";

type Props = { route: RouteConfig };

const About: SSRPage<Props, { about: string }> = ({
  pageData: { about },
  route,
}) => {
  console.log("about", useParams(), about);

  const store = useAppContext() as Store;

  return (
    <div>
      <p>
        About {store.test} {about}
      </p>
      <br />
      <button onClick={store.inc}>+ 1</button>
      <br />
      <Link to="/">Main</Link>
      <br />
      <Link to="/about/1">About/1</Link>
      <br />
      <Link to="/about/2">About/2</Link>
      <Switch>
        {route.routes?.map((route, i) => (
          <SSRRoute
            path={route.path as string}
            route={route}
            key={route.key || i}
          />
        ))}
      </Switch>
    </div>
  );
};

About.loadData = async (match, ctx, pageData) => {
  console.log("load about main", pageData);
  if (pageData["/about"]) {
    console.log("took from pageData");
    return pageData["/about"];
  }

  return { about: "data from loadData" };
};

export default observer(About);
