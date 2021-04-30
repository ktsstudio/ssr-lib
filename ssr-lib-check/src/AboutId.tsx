import * as React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SSRPage } from "@kts/ssr-utils";

type Props = { pageData: any };

const About: SSRPage<Props> = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  console.log("about", id, props.pageData);

  return (
    <div>
      <p>
        About with param {id} {props.pageData.login}
      </p>
      <Link to="/about">About</Link>
    </div>
  );
};

About.loadData = async () => {
  console.log("load about sub");
  const { data } = await axios.get("https://api.github.com/users/NapalmDeath");

  return data;
};

export default React.memo(About);
