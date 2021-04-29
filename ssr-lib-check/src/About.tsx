import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { RouteConfig } from "react-router-config";
import { SSRSwitch, useAppContext } from "@kts/ssr-utils";
import { observer } from "mobx-react";
import { Store } from "./store";

type Props = { route: RouteConfig; pageData: any };

const About: React.FC<Props> = ({ route, pageData }: Props) => {
  console.log("about", useParams(), pageData);

  const store: Store = useAppContext();

  return (
    <div>
      <p>About {store.test}</p>
      <br />
      <button onClick={store.inc}>+1</button>
      <br />
      <Link to="/">Main</Link>
      <br />
      <Link to="/about/1">About/1</Link>
      <br />
      <Link to="/about/2">About/2</Link>
      <SSRSwitch routes={route.routes} />
    </div>
  );
};

(About as any).loadData = async (match, ctx) => {
  console.log("load about main", ctx);
  return { about: "main" };
};

export default observer(About);
