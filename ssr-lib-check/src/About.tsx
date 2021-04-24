import * as React from "react";
import { Link } from "react-router-dom";
import { RouteConfig } from "react-router-config";
import axios from "axios";
import { SSRSwitch } from "@kts/ssr-utils";

type Props = { route: RouteConfig };

const About: React.FC<Props> = ({ route }: Props) => {
  return (
    <div>
      <p>About</p>
      <Link to="/">Main</Link>
      <br />
      <Link to="/about/1">About/1</Link>
      <br />
      <Link to="/about/2">About/2</Link>
      <SSRSwitch routes={route.routes} />
    </div>
  );
};

(About as any).loadData = async () => {
  const { data } = await axios.get("https://api.github.com/users/NapalmDeath");

  return data;
};

export default React.memo(About);
